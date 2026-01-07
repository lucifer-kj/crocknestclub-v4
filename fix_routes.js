const fs = require('fs');
const path = require('path');

const targetPath = path.join(process.cwd(), 'src', 'app', 'shop', '[id]');
const trashPath = path.join(process.cwd(), 'src', 'app', 'shop', '_deprecated_id');

console.log('Attempts to remove:', targetPath);

if (fs.existsSync(targetPath)) {
    try {
        console.log('Directory exists. Removing...');
        // Try rename first if direct remove fails often
        fs.renameSync(targetPath, trashPath);
        console.log('Renamed to', trashPath);

        fs.rmSync(trashPath, { recursive: true, force: true });
        console.log('Successfully removed directory.');
    } catch (e) {
        console.error('Error removing directory:', e);
        // Force delete if rename failed
        try {
            fs.rmSync(targetPath, { recursive: true, force: true });
            console.log('Force delete success.');
        } catch (e2) {
            console.error('Force delete also failed:', e2);
        }
    }
} else {
    console.log('Directory does not exist via fs.existsSync');
    const dir = path.join(process.cwd(), 'src', 'app', 'shop');
    console.log('Contents of shop:', fs.readdirSync(dir));
}
