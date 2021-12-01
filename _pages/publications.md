---
layout: page
permalink: /publications/
title: publications
description: More frequently updated publications can be found at <a href="https://scholar.google.com/citations?user=opYjaesAAAAJ&hl" target="_blank">Google Scholar</a>.<br/><br/>Following publications by categories in reversed chronological order. 
years: [2019]
nav: true
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
