<!-- <p  align="center"><img width="150" src=".github/Logo.png" alt="cover"></p> -->
<h1 align="center">
  Summer Show
</h1>

<p  align="center">Dyson School of Design Engineering, Imperial College London</p>

<p  align="center">
<sup>
    Built and maintained by
    <a href="https://github.com/nebbles">Ben Greenberg</a> &
    <a href="https://github.com/pa17">Paolo Rüegg</a>
</sup>
</p>

<!-- <h4 align="center">
  <a href="#">Documentation coming soon</a>
  <br><br>
    <img width="80" src="http://readthedocs.org/projects/de3-rob1-chess/badge/?version=latest" alt="Documentation Status"> 
</h4> -->

<p align="center">
  <strong>Production Build</strong>
</p>
<p align="center">
   <a href="https://app.netlify.com/sites/summershow-dsde/deploys"><img src="https://api.netlify.com/api/v1/badges/562a093f-d4fc-426b-ae6c-397d38253c36/deploy-status" alt="Netlify Status" /></a>
</p>
<br>
<br>

This repository contains the code for the Summer Show website. The Summer Show is the end of year exhibition run by the Dyson School of Design Engineering.

## Development

Assuming you have Ruby installed...

```bash
$ gem install bundler jekyll
$ bundle exec jekyll build
```

This will build the site into the `_site/` directory. Alternatively,

```bash
$ bundle exec jekyll serve
```

to launch a live server.
