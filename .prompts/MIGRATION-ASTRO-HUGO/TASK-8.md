# TASK-8: Theme Toggle JavaScript Implementation

## Objective
Implement vanilla JavaScript for light/dark theme switching with localStorage persistence.

## Requirements
- Vanilla JS only - no dependencies
- Toggle between light and dark themes
- Persist preference in localStorage
- Prevent flash of unstyled content (FOUC)
- Minimal code
- Works across page navigation

## Current Implementation Context
- Existing: `src/components/ThemeScript.astro` has theme toggle logic
- Theme classes: `.theme-sleek` and `.theme-sleek.dark`
- HTML element has class `.theme-sleek` by default

## Deliverables

### 1. Inline Script in `baseof.html` (Already in TASK-3)

In `<head>`, before any content renders:
```html
<script>
  // Prevent FOUC - run immediately
  (function() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

### 2. Theme Toggle Button in Header (Already in TASK-3)

```html
<button id="theme-toggle" aria-label="Toggle dark mode" class="theme-toggle-btn">
  <span class="icon-light">☀️</span>
  <span class="icon-dark">🌙</span>
</button>
```

### 3. Theme Toggle Logic (Before `</body>`)

```html
<script>
  (function() {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Update button icon based on current theme
    function updateIcon() {
      const isDark = html.classList.contains('dark');
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    // Toggle theme
    toggle.addEventListener('click', function() {
      const isDark = html.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateIcon();
    });

    // Initialize icon
    updateIcon();
  })();
</script>
```

### 4. Alternative: Keyboard Shortcut (Optional)

Add keyboard shortcut for theme toggle:
```javascript
document.addEventListener('keydown', function(e) {
  // Ctrl/Cmd + Shift + T
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
    toggle.click();
  }
});
```

## Implementation Strategy

### Phase 1: FOUC Prevention
- Inline script in `<head>` runs before render
- Checks localStorage for saved preference
- Falls back to system preference if no saved value
- Applies `.dark` class immediately if needed

### Phase 2: Toggle Functionality
- Button click toggles `.dark` class on `<html>`
- Saves preference to localStorage
- Updates button icon/label for accessibility

### Phase 3: Icon Updates
- Show sun icon when dark mode is active (click for light)
- Show moon icon when light mode is active (click for dark)
- Or simple text: "Dark" / "Light"

## Testing Checklist

1. **Initial load**:
   - No saved preference → follows system preference
   - Saved preference → applies saved theme
   - No FOUC on page load

2. **Toggle functionality**:
   - Button click switches theme
   - Visual change is immediate
   - Preference persists across page reloads
   - Preference persists across page navigation

3. **Accessibility**:
   - Button has proper `aria-label`
   - Keyboard accessible (tab to button, enter/space to toggle)
   - Optional: Keyboard shortcut works

4. **Edge cases**:
   - localStorage not available → still works (no persistence)
   - System preference changes → respects user's saved choice

## Context
- Current Astro implementation: `src/components/ThemeScript.astro`
- Theme toggle button likely in header component
- CSS variables defined in TASK-7
- Base template structure in TASK-3

## Acceptance Criteria
- [ ] FOUC prevention script in `<head>` (inline)
- [ ] Theme toggle button in header
- [ ] Toggle script before `</body>`
- [ ] Clicking button switches theme immediately
- [ ] Theme preference saved to localStorage
- [ ] Preference persists across page reloads
- [ ] No flash of wrong theme on initial load
- [ ] Falls back to system preference if no saved value
- [ ] Button icon/label updates based on current theme
- [ ] Accessible (keyboard navigation, aria-label)
- [ ] Works in both light and dark modes
- [ ] Vanilla JS only - no dependencies

## Notes
- This task coordinates with TASK-3 (baseof.html structure)
- Keep JavaScript minimal and performant
- Test FOUC prevention carefully
- Consider users without JavaScript (graceful degradation)
- Default to light theme if no preference and no system preference detected
