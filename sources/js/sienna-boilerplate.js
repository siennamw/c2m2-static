/*
 * Sienna Boilerplate
 * JavaScript (jQuery) definitions for narrow-view menu, nested menus, and active menu items
 *
 * Copyright (C) Sienna M. Wood 2016
 * 24 June 2016
 */


// root (protocol and domain) as string
var root = window.location.protocol.toString() + '//' + window.location.host.toString();


// Regularize URLs to compare them
//-------------------------------------------------
function regularizeURL(x) {
    // to regularize and compare internal links;
    // links must be absolute for this function to be effective

    // strip internal bookmark, if present
    if (x.indexOf('#') != -1){
        x = x.slice(0, x.indexOf('#'));
    }

    // if only directory is given, append 'index.html'
    if (x.charAt(x.length - 1) == '/') {
        x = x.concat('index.html');
    }

    // strip domain name, if present, leaving only initial '/'
    if (x.indexOf(root) != -1) {
        x = x.replace(root, '');
    }

    return x;
}

// Toggle menu for narrow viewports
//-------------------------------------------------
function toggleshow(id) {
    if ($(id).hasClass('show')) {
        $(id).removeClass('show').attr('aria-expanded', 'false');
    } else {
        $(id).addClass('show').attr('aria-expanded', 'true');
    }
}

// Add .focus to <li> ancestors of current link
//-------------------------------------------------
function togglefocus(elem) {
    // allows tabbing through navigation menu

    elem.parents('li').toggleClass('focus');
}

$(document).ready(function () {

    // ARIA attributes and listeners for menu
    //-------------------------------------------------

    /* aria-haspopup on parent li elements */
    $('ul#nav-menu ul').each(function () {
        $(this).parent('li').attr('aria-haspopup', 'true');
    });

    /* event listeners on links */
    $('ul#nav-menu a').on("focus blur", function () {
        togglefocus($(this));
    });


    // Add .active to anchors matching current page
    //-------------------------------------------------

    // remove 'active' class from all anchors
    $('a').removeClass('active');

    // get url as a string
    var page = window.location.toString();

    // regularize url for comparison
    page = regularizeURL(page);

    // compare anchors to url to determine which is/are active
    $('a').addClass(function (index, currentClass) {
        var newClass;
        var link = $(this).attr('href');
        if (link === undefined) {
            // do nothing
        } else {
            link = regularizeURL(link);
            if (link == page) {
                newClass = "active";
            }
        }
        return newClass;
    })

});
