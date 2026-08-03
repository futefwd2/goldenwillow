const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'GoldenWillowsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Find the section for Aster Tower (id: 9)
const asterStartIndex = content.indexOf('id: 9,');
if (asterStartIndex === -1) {
    console.error('Aster tower not found!');
    process.exit(1);
}

// Find the units section inside Aster
const unitsIndex = content.indexOf('units: [', asterStartIndex);
const unitStartIndex = content.indexOf('{', unitsIndex);

// Let's find the closing brace for this unit
// We will count nested braces
let braceCount = 0;
let unitEndIndex = -1;
for (let i = unitStartIndex; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    else if (content[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
            unitEndIndex = i + 2; // include "},"
            break;
        }
    }
}

if (unitEndIndex === -1) {
    console.error('Could not find end of Aster unit!');
    process.exit(1);
}

const unitTemplate = content.substring(unitStartIndex, unitEndIndex);

// Generate Unit 1, 2, 3, 4
const createUnit = (id, name, unitImage, image2D, staticImage, isFirst) => {
    let u = unitTemplate;
    // Replace id
    u = u.replace(/id:\s*101/, `id: ${id}`);
    // Replace name
    u = u.replace(/name:\s*"Unit No-1"/, `name: "${name}"`);
    // Replace hoverColor
    u = u.replace(/hoverColor:\s*"rgba\(0,255,229,0.3\)"/, `hoverColor: "rgba(255, 0, 255, 0.3)"`);
    // Replace polygonPoints (keep for unit 1, empty for others)
    if (!isFirst) {
        u = u.replace(/polygonPoints:\s*"[^"]*"/, `polygonPoints: ""`);
    }
    // Replace images
    u = u.replace(/unitimage:\s*aster3dUnit1/, `unitimage: ${unitImage}`);
    u = u.replace(/image2D:\s*aster2dUnit1/, `image2D: ${image2D}`);
    u = u.replace(/image2Dstatic:\s*asterStaticUnit1/, `image2Dstatic: ${staticImage}`);
    return u;
};

const unit1 = createUnit(101, 'Unit No.1', 'aster3dUnit1', 'aster2dUnit1', 'asterStaticUnit1', true);
const unit2 = createUnit(102, 'Unit No.2', 'aster3dUnit2', 'aster2dUnit2', 'asterStaticUnit2', false);
const unit3 = createUnit(103, 'Unit No.3', 'aster3dUnit3', 'aster2dUnit3', 'asterStaticUnit3', false);
const unit4 = createUnit(104, 'Unit No.4', 'aster3dUnit4', 'aster2dUnit4', 'asterStaticUnit4', false);

const newUnitsContent = [unit1, unit2, unit3, unit4].join('\n                    ');

// Replace the units content in the file
const beforeUnits = content.substring(0, unitStartIndex);
const afterUnits = content.substring(unitEndIndex);
content = beforeUnits + newUnitsContent + afterUnits;

// Update buttonSettings bgColor to pink (#ff00ff)
const asterSectionStart = content.indexOf('id: 9,');
const buttonSettingsIndex = content.indexOf('buttonSettings: {', asterSectionStart);
const threeBHKIndex = content.indexOf('threeBHK: {', buttonSettingsIndex);
const bgColorIndex = content.indexOf('bgColor: "', threeBHKIndex);
const bgColorEndIndex = content.indexOf('"', bgColorIndex + 9);

const beforeBgColor = content.substring(0, bgColorIndex + 9);
const afterBgColor = content.substring(bgColorEndIndex);
content = beforeBgColor + '#ff00ff' + afterBgColor;

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated Aster units and colors!');
