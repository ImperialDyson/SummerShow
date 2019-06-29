function activate(e) {
    var container = document.getElementById('menu__search');
    if (container.isSameNode(e.target) || container.contains(e.target)) {
        document.getElementById('result-container').style.height = '200px';
        document.getElementById('search-input').style.width = '170px';
        // document.getElementById('looking-glass').style.width = '0px';
        setTimeout(function () {
            document.getElementById('search-input').focus();
        }, 500);
    }
}

document.addEventListener('mousedown', activate);
document.addEventListener('touchstart', activate);

function deactivate(e) {
    var menu = document.getElementsByClassName('menu__list')[0];
    var container = document.getElementById('menu__search');
    var input = document.getElementById('search-input');

    // if the target of the click isn't the container, 
    // nor a descendant of the container, 
    // nor the menu (fix for fast clicks)
    if (!(container.isSameNode(e.target) || container.contains(e.target) || menu.isSameNode(e.target))) {
        if (input.value === "") {
            document.getElementById('result-container').style.height = '0px';
            document.getElementById('search-input').style.width = '0px';
            // document.getElementById('looking-glass').style.width = '30px';
            setTimeout(function () {
                document.getElementById('search-input').blur();
            }, 500);
        }
    }
}

document.addEventListener('mouseup', deactivate);
document.addEventListener('touchend', deactivate);