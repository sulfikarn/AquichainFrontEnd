class Colors {
    static getColorNames() {
        let names = [];

        names.push('Random');

        for (let i = 0; i < Colors.basic.length; i++) {
            names.push(Colors.basic[i].name);
        }

        return names;
    }

    static getColor(name) {
        for (let i = 0; i < Colors.basic.length; i++) {
            if (name === Colors.basic[i].name) {
                return Colors.basic[i];
            }
        }

        return {
            name: 'Random',
            hue: Math.random(),
            saturation: Math.random() % 0.66 + 0.33, 
            lightness: Math.random() % 0.33 + 0.33
        };
    }
}

Colors.basic = [
    { name: 'Red', hue: 0, saturation: 1, lightness: 0.50 },
    { name: 'Blue', hue: 0.57, saturation: 1, lightness: 0.48 },
    { name: 'Green', hue: 0.26, saturation: 0.71, lightness: 0.48 },
    { name: 'Yellow', hue: 0.17, saturation: 0.95, lightness: 0.57 },
    { name: 'Orange', hue: 0.12, saturation: 0.95, lightness: 0.57 },
    { name: 'Black', hue: 0, saturation: 0, lightness: 0 },
    { name: 'Pink', hue: 0.83, saturation: 0.64, lightness: 0.87 },
    { name: 'Brown', hue: 0.08, saturation: 0.50, lightness: 0.27 },
    { name: 'Azure', hue: 0.5, saturation: 0.73, lightness: 0.52 }
];