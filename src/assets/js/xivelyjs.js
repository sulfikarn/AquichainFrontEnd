/* eslint-disable */

/*! xively-js v1.0.4 | Copyright Xively (LogMeIn Inc.) | BSD 3-Clause license */
(function () {
    "use strict";
    // Save a reference to the global object
    var root = this, // Allow use of jQuery, Zepto or ender with Xively.js in the style of Backbone
    $ = root.jQuery || root.Zepto || root.ender || root.$, protocol = function () {
        return document.location.protocol === "https:" ? "https:" : "http:";
    }, // Wraps all socket connection and message sending logic
    SocketTransport = function (apiHost) {
        var self = this, socket = false, socketReady = false, queue = [], execute = function (arr) {
            if (typeof arr === "function") {
                arr.apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (Object.prototype.toString.apply(arr) === "[object Array]") {
                var x = arr.length;
                while (x--) {
                    arr[x].apply(this, Array.prototype.slice.call(arguments, 1));
                }
            }
        };
        this.connect = function (callback) {
            var SocketProvider = ReconnectingWebSocket || window.SockJS || window.MozWebSocket || window.WebSocket, socketEndpoint, socketPort;
            if (!socket && SocketProvider) {
                socketEndpoint = (protocol() === "https:" ? "wss:" : "wss:") + "//" + apiHost;
                socket = new SocketProvider(socketEndpoint, null, {reconnectInterval:2600, reconnectDecay:1.15});
                socket.onerror = function (e) {
                    var response = { error: "socketerrorOnError" }
                    $("body").trigger("xively.mysocket", response,response);
                    if (self.error) {
                        self.error(e, this);
                    }
                  /*  socket = false;
                    socketReady = false;
                    self.connect();*/
                };
                socket.onclose = function (e) {
                    var response = { error: "socketerrorOnClose" }
                    $("body").trigger("xively.mysocket", response,response);

                    if (self.close) {
                        self.close(e, this);
                    }
                 /*   socket = false;
                    socketReady = false;
                    self.connect();*/
                };
                socket.onopen = function (e) {
                    socketReady = true;
                    if (self.open) {
                        self.open(e, this);
                    }
                    if (queue.length) {
                        execute(queue);
                    }
                    if (callback) {
                        callback(this);
                    }
                };
                socket.onmessage = function (e) {
                    var data = e.data, response = JSON.parse(data);
                    
                    if (response.body) {
                        $("body").trigger("xively." + response.resource, response.body);

                        if (response.resource.split("/")[1] === "feeds") {
                            $("body").trigger("xively./feeds/", response.body);
                        }

                        if (response.resource.split("/")[1] === "zones") {
                            $("body").trigger("xively./zones/", response.body);
                        }
                    } else if (response.socket) {
                        $("body").trigger("xively.mysocket", response);

                    }
                };
            } 
        };
        this.send = function (message) {
            if (!socketReady) {
                this.connect();
                queue.push(function () {
                    socket.send(message);
                });
            } else {
                socket.send(message);
            }
        };
    };
    // Main Xively client object
    var XivelyClient = function (apiHost) {
        // set the default api host
        apiHost = apiHost || "api.xively.com";

        // private stuff
        var self = this, version = "1.0.4", apiEndpoint = protocol() + "//" + apiHost + "/v2", cacheRequest = false, apiKey, // var which will hold the public API we are going to expose
        methods, // log helper method that doesn't break in environments without console.log
        log = function (msg) {
            if (window.console && window.console.log) {
                window.console.log(msg);
            }
        }, // Ajax request
        request = function (options) {
            var settings = $.extend({
                type: "get",
                dataType: "json"
            }, options);
            if (!apiKey) {
                return log("(xivelyJS) ::: No API key ::: Set your API key first with xively.setKey( YOUR_API_KEY ) before using any methods. Check docs for more info.");
            }
            if (!settings.url) {
                return;
            }
            settings.type = settings.type.toUpperCase();
            if (settings.type === "PUT" || settings.type === "POST") {
                if (!settings.data || typeof settings.data !== "object") {
                    return;
                } else {
                    settings.data = JSON.stringify(settings.data);
                }
            }
            $.ajax({
                url: settings.url,
                type: settings.type,
                headers: {
                    "X-ApiKey": apiKey,
                    "Content-Type": "application/json"
                },
                data: settings.data,
                crossDomain: true,
                dataType: settings.dataType,
                cache: cacheRequest
            }).done(settings.done).fail(settings.fail).always(settings.always);
        }, resources = [], callbacks = {}
        // disable caching
        $.ajaxSetup({
            cache: cacheRequest
        });
        this.socket = function () {
            if (this._ws) {
                return this._ws;
            }
            return this._ws = new SocketTransport(this.apiHost);
        };
        this.version = function () {
            return version;
        };
        // ---------------------------------
        // Set API Key
        //
        this.setKey = function (newKey) {
            apiKey = newKey;
        };
        // ---------------------------------
        // Expose api endpoint
        //
        this.apiEndpoint = apiEndpoint;
        this.apiHost = apiHost;
        // ---------------------------------
        // General API interaction functions
        //
        this.getSubscribers = function(){
            return callbacks;
        }
        this.removeLocalSubscribers = function(){
            callbacks = {};
            resources = [];
        }
        this.reconnectSubscribers = function() {
            resources = [];
            for (var resource in callbacks){
                this.subscribe(resource, callbacks[resource]);
            }
        }
        this.request = request;
        // this.subscribe = ws.subscribe.bind(ws);
        this.subscribe = function (resource, callback) {
            var request = '{"headers":{"X-ApiKey":"' + apiKey + '"}, "method":"subscribe", "resource":"' + resource + '"}';
            if (!apiKey) {
                return log("(xivelyJS) ::: No API key ::: Set your API key first with xively.setKey( YOUR_API_KEY ) before using any methods. Check docs for more info.");
            }
            if (resources.indexOf(resource) < 0) {
                resources.push(resource);
                callbacks[resource] = callback;
                this.socket().send(request);
            }
            if (callback && typeof callback === "function") {
                $(document).off("xively." + resource); 
                $(document).on("xively." + resource, callback);
            }
        };
        this.unsubscribe = function (resource) {
            if (!apiKey) {
                return log("(xivelyJS) ::: No API key ::: Set your API key first with xively.setKey( YOUR_API_KEY ) before using any methods. Check docs for more info.");
            }
            var index = resources.indexOf(resource);
            if (index >= 0) {
                resources.splice(index, 1);
                callbacks[resource] = false;
                this.socket().send('{"headers":{"X-ApiKey":"' + apiKey + '"}, "method":"unsubscribe", "resource":"' + resource + '"}');
            }
        };

        this.testsocket = function (callback) {
            this.socket().send('{"headers":{"X-ApiKey":"' + apiKey + '"},"method":"test"}');
            if (callback && typeof callback === "function") {
                $(document).on("xively.mysocket", callback);
            }
        }

        this.live = function (selector, resource) {
            var callback = function (event, data) {
                var response = event.current_value ? event : data;
                if (response.current_value) {
                    $(selector).each(function () {
                        $(this).html(response.current_value).attr("data-xively-resource", resource);
                    });
                }
            };
            request({
                url: apiEndpoint + resource,
                always: callback
            });
            this.subscribe(resource, callback);
        };
        this.stop = function (selector) {
            this.unsubscribe($(selector).first().attr("data-xively-resource"));
        };
      
        this.test = {
            connection: function (callback) {
                request({
                    type: "get",
                    url: apiEndpoint + "/test",

                    always: callback
                });
            },

            testsocket: function (callback) {
                self.testsocket(callback);
            },
        };
        // ---------------------------------
        // User module
        //
        this.user = {
            subscribe: function (id, callback) {
                if (id) {
                    self.subscribe("/user/" + id, callback);
                }
            },
            unsubscribe: function (id, callback) {
                if (id) {
                    self.unsubscribe("/user/" + id);
                }
            }
        }

        this.initializations = {
            list : function (callback) {
                request({
                    url: apiEndpoint + "/initializations",
                    always: callback
                });               
            },
            get : function (id, callback) {
                request({
                    url: apiEndpoint + "/initializations/" + id,
                    always: callback
                });
            }
        }

        this.plans = {
            update: function (id, data, callback) {
                request({
                    type: "put",
                    url: apiEndpoint + "/plans/" + id,
                    data: data,
                    always: callback
                });
            },
            updateByName: function (bid, planname, data, callback) {
                request({
                    type: "put",
                    url: apiEndpoint + "/buildings/" + bid + "/plans/" + encodeURIComponent(planname),
                    data: data,
                    always: callback
                });
            },
            list: function (bid, callback) {
                request({
                    type: "get",
                    url: apiEndpoint + "/buildings/" + bid + "/plans",
                    always: callback
                });
            },
            delete: function (id,  callback) {
                 request({
                    type: "delete",
                    url: apiEndpoint + "/plans/" + id,
                    data: data,
                    always: callback
                });               
            },
            deleteByName: function (bid, planname, callback) {
                 request({
                    type: "delete",
                    url: apiEndpoint + "/buildings/" + bid + "/plans/" + encodeURIComponent(planname),
                    always: callback
                });               
            }
        }

        this.restrictions = {
            getAll: function(callback) {
                request({
                    type: "get",
                    url: apiEndpoint + "/restrictions",
                    always: callback
                })
            },

            getSettings: function (callback) {
                request({
                    type: "get",
                    url: apiEndpoint + "/settings",
                    always: callback
                });
            },
            
            getSlaves: function (mac, callback) {
                request({
                    type: "get",
                    url: apiEndpoint + "/restrictions/" + mac,
                    always: callback
                });
            },

            updateSlaves: function (mac, data, callback) {
                request({
                    type: "put",
                    url: apiEndpoint + "/restrictions/" + mac,
                    dataType: "text",
                    always: callback,
                    data: data
                });
            },

            addSettings: function(data, callback) {
                request({
                    type: "post",
                    data: data,
                    url: apiEndpoint + "/settings",
                    always: callback
                });
            },

            updateSettings: function(id, data, callback) {
                request({
                    type: "put",
                    data: data,
                    dataType: "text",
                    url: apiEndpoint + "/settings/" + id,
                    always: callback
                });
            },

            deleteSettings: function(id, callback) {
                request({
                    type: "delete",
                    dataType: "text",
                    url: apiEndpoint + "/settings/" + id,
                    always: callback
                });
            }
        }

        // ---------------------------------
        // Zones module
        //
        this.zones = {
            update: function (id, plan, data, callback) {
                request({
                    type: "put",
                    url: apiEndpoint + "/buildings/" + id + "/plans/" + encodeURIComponent(plan) + "/zones",
                    data: data,
                    always: callback
                });
            },
            subscribeToAll: function(callback) {
                self.subscribe("/zones/", callback);
            }
        }
       
       
        this.zone = {
            get: function (id, callback) {
                request({
                    url: apiEndpoint + "/zones/" + id + "/history",
                    always: callback
                });
            },
            update: function (id, data, callback) {
                request({
                    type: "put",
                    url: apiEndpoint + "/zones/" + id,
                    data: data,
                    always: callback
                });
            },
            "new": function (id, plan, data, callback) {
                request({
                    type: "post",
                    url: apiEndpoint + "/buildings/" + id + "/plans/" + encodeURIComponent(plan) + "/zones",
                    data: data,
                    always: callback
                });
            },

            list: function (id, plan, callback) {
                request({
                    url: apiEndpoint + "/buildings/" + id + "/plans/" + encodeURIComponent(plan) + "/zones",
                    always: callback
                });
            },
            "delete": function (id, callback) {
                request({
                    type: "delete",
                    dataType: "text",
                    url: apiEndpoint + "/zones/" + id,
                    always: callback
                });
            }
        };

        this.zonesGroups = {
            list: function (callback) {
                request({
                    type: "get",
                    url: apiEndpoint + "/zonesgroups",
                    always: callback
                });
            },
            "new": function (data, callback) {
                request({
                    type: "post",
                    url: apiEndpoint + "/zonesgroups",
                    data: data,
                    always: callback
                });
            },
            update: function(id, data, callback) {
                request({
                    type: "put",
                    url: apiEndpoint + "/zonesgroups/" + id,
                    data: data,
                    always: callback
                });
            },
            "delete": function (id, callback) {
                request({
                    type: "delete",
                    dataType: "text",
                    url: apiEndpoint + "/zonesgroups/" + id,
                    always: callback
                });
            }
        }

        this.zonesSettings = {
            list: function (callback) {
                request({
                    url: apiEndpoint + "/zonessettings",
                    always: callback
                });
            },
            "new": function (data, callback) {
                request({
                    type: "post",
                    url: apiEndpoint + "/zonessettings",
                    data: data,
                    always: callback
                });
            },
            update: function(id, data, callback) {
                request({
                    type: "put",
                    url: apiEndpoint + "/zonessettings/" + id,
                    data: data,
                    always: callback
                });
            },
            "delete": function (id, callback) {
                request({
                    type: "delete",
                    dataType: "text",
                    url: apiEndpoint + "/zonessettings/" + id,
                    always: callback
                });
            }
        }

        this.path = {
            "new": function(feedID, planName, data, callback) {
                request({
                    type: "post",
                    url: apiEndpoint + "/buildings/" + feedID + "/plans/" + encodeURIComponent(planName) + "/paths",
                    data: data,
                    always: callback
                });
            },

            list: function(feedID, planName, callback) {
                request({
                    url: apiEndpoint + "/buildings/" + feedID + "/plans/" + encodeURIComponent(planName) + "/paths",
                    always: callback
                });
            },

            "delete": function(pathID, callback) {
                request({
                    type: "delete",
                    dataType: "text",
                    url: apiEndpoint + "/paths/" + pathID,
                    always: callback
                });
            },

            update: function(pathID, data, callback) {
                request({
                    type: "put",
                    dataType: "text",
                    url: apiEndpoint + "/paths/" + pathID,
                    data: data,
                    always: callback
                });
            }
        }

        this.wall = {
            "new": function(feedID, planName, data, callback) {
                request({
                    type: "post",
                    url: apiEndpoint + "/buildings/" + feedID + "/plans/" + encodeURIComponent(planName) + "/walls",
                    data: data,
                    always: callback
                });
            },
            list: function(feedID, planName, callback) {
                request({
                    url: apiEndpoint + "/buildings/" + feedID + "/plans/" + encodeURIComponent(planName) + "/walls",
                    always: callback
                });
            },

            "delete": function(wallID, callback) {
                request({
                    type: "delete",
                    dataType: "text",
                    url: apiEndpoint + "/walls/" + wallID,
                    always: callback
                });
            },

            update: function(wallID, data, callback) {
                request({
                    type: "put",
                    dataType: "text",
                    url: apiEndpoint + "/walls/" + wallID,
                    data: data,
                    always: callback
                });
            }
        }

        this.exit = {
            "new": function(feedID, planName, data, callback) {
                request({
                    type: "post",
                    url: apiEndpoint + "/buildings/" + feedID + "/plans/" + encodeURIComponent(planName) + "/exits",
                    data: data,
                    always: callback
                });
            },
            list: function(feedID, planName, callback) {
                request({
                    url: apiEndpoint + "/buildings/" + feedID + "/plans/" + encodeURIComponent(planName) + "/exits",
                    always: callback
                });
            },

            "delete": function(exitID, callback) {
                request({
                    type: "delete",
                    dataType: "text",
                    url: apiEndpoint + "/exits/" + exitID,
                    always: callback
                });
            },

            update: function(exitID, data, callback) {
                request({
                    type: "put",
                    dataType: "text",
                    url: apiEndpoint + "/exits/" + exitID,
                    data: data,
                    always: callback
                });
            }
        }

        this.models = {
            list: function (callback) {
                request({
                    url: apiEndpoint + "/models",
                    always: callback
                });
            },
            update: function (id, data, callback) {
                request({
                    type: "put",
                    url: apiEndpoint + "/models/" + id,
                    data: data,
                    always: callback
                });
            },
            "new": function (data, callback) {
                request({
                    type: "post",
                    url: apiEndpoint + "/models",
                    data: data,
                    always: callback
                });
            },
            "delete": function (id, callback) {
                request({
                    type: "delete",
                    url: apiEndpoint + "/models/" + id,
                    always: callback
                });
            }
        };

        // ---------------------------------
        // Feed module
        //
        this.feed = {
            setHost: function (aep) {
                apiEndpoint = aep;
            },
            get: function (id, callback) {
                request({
                    url: apiEndpoint + "/feeds/" + id,
                    always: callback
                });
            },
            update: function (id, data, callback) {
                request({
                    type: "put",
                    url: apiEndpoint + "/feeds/" + id,//+ ".json",
                    dataType: "text",
                    data: data,
                    always: callback
                });
            },
            "new": function (data, callback) {
                request({
                    type: "post",
                    url: apiEndpoint + "/feeds",
                    data: data,
                    always: callback
                });
            },
            "delete": function (id, callback) {
                request({
                    type: "delete",
                    url: apiEndpoint + "/feeds/" + id,
                    dataType: "text",
                    always: callback
                });
            },
            history: function (id, options, callback) {
                request({
                    url: apiEndpoint + "/feeds/" + id + ".json",
                    data: options,
                    always: callback
                });
            },
            list: function (options, callback) {
                request({
                    url: apiEndpoint + "/feeds",
                    data: options,
                    always: callback
                });
                //   apiEndpoint = "turo";   
            },
            listMyFeeds: function (options, callback) {
                request({
                    url: apiEndpoint + "/keyfeeds",
                    //       data: options,
                    always: callback
                });
            },
            subscribe: function (id, callback) {
                if (id) {
                    self.subscribe("/feeds/" + id, callback);
                }
            },
            unsubscribe: function (id, callback) {
                if (id) {
                    self.unsubscribe("/feeds/" + id);
                }
            },
            subscribeToAll: function(callback) {
                self.subscribe("/feeds/", callback);
            },
            unsubscribeFromAll: function() {
                self.unsubscribe("/feeds/");
            }
        };

        this.profiler = {
            get: function(callback) {
                request({
                    url: apiEndpoint + "/profiler",
                    always: callback
                });
            },
            post: function(data, callback) {
                request({
                    type: "post",
                    dataType: "text",
                    data: data,
                    url: apiEndpoint + "/profiler",
                    always: callback
                });
            },
            subscribe: function(callback) {
                self.subscribe("/profiler/data", callback);
            },
            unsubscribe: function() {
                self.unsubscribe("/profiler/data");
            }
        };

        // ---------------------------------
        // Datastream module
        //
        this.datastream = {
            get: function (feed_id, datastream_id, callback) {
                request({
                    url: apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id + ".json",
                    always: callback
                });
            },
            update: function (feed_id, datastream_id, data, callback) {
                request({
                    type: "put",
                    url: apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id + ".json",
                    data: data,
                    always: callback
                });
            },
            "new": function (feed_id, data, callback) {
                request({
                    type: "post",
                    url: apiEndpoint + "/feeds/" + feed_id + "/datastreams",
                    data: data,
                    always: callback
                });
            },
            "delete": function (feed_id, datastream_id, callback) {
                request({
                    type: "delete",
                    url: apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id,
                    always: callback
                });
            },
            history: function (feed_id, datastream_id, options, callback) {
                request({
                    url: apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id + ".json",
                    data: options,
                    always: callback
                });
            },
            list: function (feed_id, callback) {
                request({
                    url: apiEndpoint + "/feeds/" + feed_id + ".json",
                    always: function (data) {
                        callback.call(this, data.datastreams);
                    }
                });
            },
            subscribe: function (feed_id, datastream_id, callback) {
                if (feed_id && datastream_id) {
                    self.subscribe("/feeds/" + feed_id + "/datastreams/" + datastream_id, callback);
                }
            },
            unsubscribe: function (feed_id, datastream_id, callback) {
                if (feed_id && datastream_id) {
                    self.unsubscribe("/feeds/" + feed_id + "/datastreams/" + datastream_id);
                }
            },
            live: function (element, feed_id, datastream_id) {
                if (element && feed_id && datastream_id) {
                    self.live(element, "/feeds/" + feed_id + "/datastreams/" + datastream_id);
                }
            },
            stop: function (element) {
                if (element) {
                    self.stop(element);
                }
            }
        };
        // ---------------------------------
        // Datapoint module
        //
        this.datapoint = {
            get: function (feed_id, datastream_id, timestamp, callback) {
                request({
                    url: apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id + "/datapoints/" + timestamp,
                    always: callback
                });
            },
            update: function (feed_id, datastream_id, timestamp, value, callback) {
                request({
                    type: "put",
                    url: apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id + "/datapoints/" + timestamp,
                    data: {
                        value: value
                    },
                    always: callback
                });
            },
            "new": function (feed_id, datastream_id, data, callback) {
                request({
                    type: "post",
                    url: apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id + "/datapoints",
                    data: data,
                    always: callback
                });
            },
            "delete": function (feed_id, datastream_id, timestamp, callback) {
                var req_options = {
                    type: "delete",
                    always: callback
                };
                if (typeof timestamp === "object") {
                    req_options.url = apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id + "/datapoints";
                    req_options.data = timestamp;
                } else {
                    req_options.url = apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id + "/datapoints/" + timestamp;
                }
                request(req_options);
            },
            history: function (feed_id, datastream_id, options, callback) {
                request({
                    url: apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id + ".json",
                    data: options,
                    always: function (data) {
                        callback.call(this, data.datapoints);
                    }
                });
            }
        };
        this._settings = function () {
            return {
                apiKey: apiKey,
                apiHost: apiHost,
                cacheRequest: cacheRequest
            };
        };
        return this;
    };
    root.XivelyClient = XivelyClient;
    root.xively = root.Xively = new XivelyClient();
}).call(this);

/*
 *
 *   JQUERY PLUGIN
 *
 */
(function ($) {
    var resourcify = function (options) {
        if (typeof options === "object") {
            return "/feeds/" + options.feed + (options.datastream ? "/datastreams/" + options.datastream : "");
        } else if (typeof options === "string" && options !== "") {
            return options;
        } else {
            return "";
        }
    }, methods = {
        live: function (options) {
            xively.live(this, resourcify(options));
            return this;
        },
        get: function (options) {
            var $this = $(this);
            xively.request({
                url: xively.apiEndpoint + resourcify(options) + ".json",
                always: function (data) {
                    $this.each(function () {
                        $(this).html(data.current_value);
                    });
                }
            });
            return this;
        },
        stop: function () {
            xively.stop(this);
            return this;
        }
    };
    $.fn.xively = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist on jQuery.xively");
        }
    };
})(jQuery);