---
layout: default
---
{% assign strings = site.data.strings %}
<article>
  <header>
    <h2>{{ page.title | default:strings.home | default:"Table of Content" }}</h2>
  </header> 
  <!-- ![Alt Text](http://localhost:4000/assets/chip.jpg] -->
  {% assign pages = site.pages | where_exp:"page","page.title != ''" | sort: "order" %}
  <!-- {% assign pages = site.pages | sort: "order" %} -->

  <!-- {% if pages.size > 0 %}
    <h2> {{ strings.pages | default:"Topics" }}</h2>
    <ol>
      {% for page in pages %}
        {% if page.layout == 'page' and page.title != '' %}
        <li class="h6">
          <a href="{{ page.url | relative_url }}">
            <span>{{ page.title }}</span>
          </a>
        </li>
        {% endif %}
      {% endfor %}
    </ol>
  {% endif %} -->
{% if pages.size > 0 %}
  <!-- <h2> {{ strings.pages | default:"Table of Content" }}</h2> -->
  <ol>
    {% for page in pages %}
      {% if page.layout == 'page' and page.title != '' %}
        {% if page.order == 0 %}
          <li class="h6">
            <a href="{{ page.url | relative_url }}">
              <span>{{ page.title }}</span>
            </a>
          </li>
        {% elsif page.order == 1 %}
          <li class="h6">
            <a href="{{ page.url | relative_url }}">
              <span>{{ page.title }}</span>
            </a>
          </li>
          <ol>
            {% for sub_page in pages %}
              {% if sub_page.order >= 1.1 and sub_page.order < 1.5 %}
                <li class="h8" style="margin-bottom: 0; padding-bottom: 0;">
                  <a href="{{ sub_page.url | relative_url }}">
                    <span>{{ sub_page.title }}</span>
                  </a>
                </li>
              {% endif %}
            {% endfor %}
          </ol>
        {% elsif page.order == 2 %}
          <li class="h6">
            <a href="{{ page.url | relative_url }}">
              <span>{{ page.title }}</span>
            </a>
          </li>
          <ol>
            {% for sub_page in pages %}
              {% if sub_page.order >= 2.1 and sub_page.order <=2.5 %}
                <li class="h8" style="margin-bottom: 0; padding-bottom: 0;">
                  <a href="{{ sub_page.url | relative_url }}">
                    <span>{{ sub_page.title }}</span>
                  </a>
                </li>
              {% endif %}
            {% endfor %}
          </ol>
        {% elsif page.order ==3 %}
          <li class="h6">
            <a href="{{ page.url | relative_url }}">
              <span>{{ page.title }}</span>
            </a>
          </li>
          <ol>
            {% for sub_page in pages %}
              {% if sub_page.order >= 3.1 and sub_page.order <=3.5 %}
                <li class="h8" style="margin-bottom: 0; padding-bottom: 0;">
                  <a href="{{ sub_page.url | relative_url }}">
                    <span>{{ sub_page.title }}</span>
                  </a>
                </li>
              {% endif %}
            {% endfor %}
          </ol>
        {% elsif page.order >= 4 and page.order <=5 %}
          <li class="h6">
            <a href="{{ page.url | relative_url }}">
              <span>{{ page.title }}</span>
            </a>
          </li>
        {% endif %}
      {% endif %}
    {% endfor %}
  </ol>
{% endif %}
</article>
