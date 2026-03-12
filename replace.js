const fs = require('fs');
const path = require('path');

const rootDir = 'd:\\BPS\\[Orientasi] BPS Tabanan\\dashboard-ekonomi-digital';

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.js')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walkDir(path.join(rootDir, 'src')).concat([path.join(rootDir, 'tailwind.config.js')]);
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    if (content.includes('#003087')) {
        content = content.replace(/#003087/g, '#e65100');
        changed = true;
    }
    if (content.includes('#002060')) {
        content = content.replace(/#002060/g, '#bf360c');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log('Updated ' + file);
    }
});
