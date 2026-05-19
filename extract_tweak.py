import os
import re

source = '/Users/macpluche/Desktop/Antigravity/Gradient tweak/gradient_scroll_preview.jsx'
target_dir = '/Users/macpluche/Desktop/Antigravity/Scrollfree/src/components/gradient'

os.makedirs(target_dir, exist_ok=True)

with open(source, 'r', encoding='utf-8') as f:
    content = f.read()

# Change function signature
content = content.replace('export default function GradientScrollPreview() {', 'export default function GradientTweak({ children }: { children: React.ReactNode }) {')

# Replace the components with {children}
render_pattern = r'<TopBar panelOpen={panelOpen} setPanelOpen={setPanelOpen} />\s*<Hero />\s*<Services settings={settings} groups={visibleGroups} pageVh={pageVh} />\s*<Stats />\s*<Testimonials />\s*<Footer />'
content = re.sub(render_pattern, '{children}', content)

with open(os.path.join(target_dir, 'GradientTweak.tsx'), 'w', encoding='utf-8') as f:
    f.write(content)

print('Success')
