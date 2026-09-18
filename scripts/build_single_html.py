import os
import base64
import re

dist_dir = 'dist'
html_path = os.path.join(dist_dir, 'index.html')

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Inline CSS
css_match = re.search(r'<link[^>]+rel=["\']stylesheet["\'][^>]+href=["\']([^"\']+)["\'][^>]*>', html)
if css_match:
    css_rel = css_match.group(1).lstrip('/')
    css_full = os.path.join(dist_dir, css_rel)
    if os.path.exists(css_full):
        with open(css_full, 'r', encoding='utf-8') as cf:
            css_content = cf.read()
        html = html.replace(css_match.group(0), f'<style>\n{css_content}\n</style>')

# Inline JS
js_match = re.search(r'<script[^>]+src=["\']([^"\']+)["\'][^>]*></script>', html)
if js_match:
    js_rel = js_match.group(1).lstrip('/')
    js_full = os.path.join(dist_dir, js_rel)
    if os.path.exists(js_full):
        with open(js_full, 'r', encoding='utf-8') as jf:
            js_content = jf.read()
        html = html.replace(js_match.group(0), f'<script type="module">\n{js_content}\n</script>')

# Inline images as base64 data URIs
images = ['char_ali.jpg', 'char_chen.jpg', 'char_lin.jpg', 'leo_photo.jpg']
for img in images:
    img_path = os.path.join('public', img)
    if os.path.exists(img_path):
        with open(img_path, 'rb') as imf:
            b64 = base64.b64encode(imf.read()).decode('utf-8')
        data_uri = f'data:image/jpeg;base64,{b64}'
        html = html.replace(f'/{img}', data_uri)
        html = html.replace(f'"{img}"', f'"{data_uri}"')

out_path = os.path.join('public', 'life_reset_game_leo.html')
with open(out_path, 'w', encoding='utf-8') as out:
    out.write(html)

size_mb = os.path.getsize(out_path) / (1024 * 1024)
print(f"Successfully generated {out_path}, size: {size_mb:.2f} MB")
