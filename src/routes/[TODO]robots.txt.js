/*
{%- assign noindexPages = site.pages | where: 'sitemap', false -%}
{%- assign noindexDocuments = site.documents | where: 'sitemap', false -%}
{% if jekyll.environment != "production" %}
Disallow: /
{% else %}
  {%- if noindexDocuments != empty or noindexPages != empty -%}
  {%- for node in noindexPages -%}
Disallow: {{ node.url }}
  {%- endfor -%}
  {%- for node in noindexDocuments -%}
Disallow: {{ node.url }}
  {%- endfor -%}
  {%- else -%}
Sitemap: {{ "/sitemap.xml" | absolute_url }}
  {%- endif -%}
{% endif %}
 */
