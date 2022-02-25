---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
---

{% include base_path %}

<!-- A list of all the posts and pages found on the site. For you robots out there is an [XML version]({{ base_path }}/sitemap.xml) available for digesting as well. -->

<h2>Pages</h2>
{% for post in site.pages %}
  {% if post.title == "About me" or post.title == "CV" or post.title == "Publications" or post.title == "Teaching & Service" %}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}

<h2>Posts</h2>
{% for post in site.posts %}
  {% if post.title == "NOTHIING" %}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}

{% capture written_label %}'None'{% endcapture %}

{% for collection in site.collections %}
{% unless collection.output == false or collection.label == "posts" %}
  {% capture label %}{{ collection.label }}{% endcapture %}
  {% if label != written_label %}
  <h2>{{ label }}</h2>
  {% capture written_label %}{{ label }}{% endcapture %}
  {% endif %}
{% endunless %}
  {% for post in collection.docs %}
    {% unless collection.output == false or collection.label == "posts" %}
      {% if post.collection == 'publications' or post.collection == 'teaching' %}
      {% include archive-single.html %}
      {% endif %}
    {% endunless %}
  {% endfor %}
{% endfor %}
