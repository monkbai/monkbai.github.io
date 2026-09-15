# monkbai.github.io
Zhibo Liu's page

`index.html` is generated from `config.js`.

After updating `config.js`, regenerate the static page with:

```bash
python3 tools/render_static_page.py
```

To change the visitor tracker, replace the contents of `visitor-tracker.html` with the
snippet copied from MapMyVisitor, then run the same render command. The snippet is
inserted as HTML, so it can include the `<script>` and container elements provided by
MapMyVisitor.
