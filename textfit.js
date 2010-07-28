/**
 * (C) 2007 Andrew Gwozdziewycz <apgwoz@gmail.com>
 * VERSION: 0.1, Released under an MIT License. 
 * URL: http://www.apgwoz.com/textfit/
 **/
function textFit(node, minfs, maxfs, width, height) {
    var fits = function(sz) {
        node.style.fontSize = sz + 'px';
        return node.offsetWidth <= width && node.offsetHeight <= height;
    };
    var hfs = maxfs - minfs;
    var tst = minfs + Math.ceil(hfs / 2);
    var opsz = node.style.fontSize;
    
    while ((hfs/2) >= 1) {
        if (fits(tst)) {
            minfs = tst;
        }
        else {
            maxfs = tst;
        }
        hfs = maxfs - minfs;
        tst = minfs + Math.ceil(hfs/2);
    }
    opsz = fits(maxfs) ? maxfs: minfs;
    node.style.fontSize = opsz + 'px';
}
