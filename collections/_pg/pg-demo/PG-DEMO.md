---
title: 'PG Demo Project'
author: Your Name
subtitle: 'This is an example of the things you can do to make your project look epic!'
date: 2018-06-30 00:00:00
description: Please put up to two short sentences here explaining what you're project is about. 
featured_image: 'Placeholder.jpg' # This needs to be square and XXX by XXX pixels.
tags: [Demo, Project, Tag]
---

![](Hero.jpg)

## Demo Project

This page is a demo that shows everything you can do to present your project. It's important that you have a look at this file in the text editor of your choice (e.g. VS Code, Sublime, Atom, etc.) to understand how Markdown presents your text.


**Obviously,** we’ve styled up *all the basic* text formatting options [available in markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

You can create lists:

* Simple bulleted lists
* Like this one
* Are cool

And:

1. Numbered lists
2. Like this other one
3. Are great too

You can also add blockquotes, which are shown at a larger width to help break up the layout and draw attention to key parts of your content:

> “Design engineers are problem solvers who bridge the gap between traditional engineering and design.”

The website also supports markdown tables:

| Type                 | Exhibition Space          |
|----------------------|---------------------------|
| Undergrad  		   | Level 0 & Level 1     	   |      
| Postgrad  		   | Level 2 		       	   |
| PhD				   | Level 3		           |

You can throw in some horizontal rules too:

---

### Image galleries

Here's a really neat way to present your images - galleries:

<div class="gallery" data-columns="2">
	<img src="I.jpg">
	<img src="Am.jpg">
	<img src="A.jpg">
	<img src="Placeholder.jpg">
</div>

Inspired by the Galleries feature from WordPress, we've made it easy to create grid layouts for your images. Just use a bit of simple HTML in your post to create a masonry grid image layout:

```html
<div class="gallery" data-columns="2">
	<img src="I.jpg">
	<img src="Am.jpg">
	<img src="A.jpg">
	<img src="Placeholder.jpg">
</div>
```

*See what we did there? Code and syntax highlighting is available too!*

Change the number inside the 'columns' setting to create different types of gallery for all kinds of purposes. You can even click on each image to seamlessly enlarge it on the page.

---

### Image carousels

Here's another gallery with only one column, which creates a carousel slide-show instead.

A nice little feature: the carousel only advances when it is in view, so your visitors won't scroll down to find it half way through your images.

<div class="gallery" data-columns="1">
	<img src="I.jpg">
	<img src="Am.jpg">
	<img src="A.jpg">
	<img src="Placeholder.jpg">
</div>

### What about videos?

Videos are an awesome way to show off your work in a more engaging way, and we’ve made sure they work great. Just paste an embed code from YouTube or Vimeo, and we make sure it displays perfectly:

<iframe width="560" height="315" src="https://www.youtube.com/embed/fB53-pcwPNQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>