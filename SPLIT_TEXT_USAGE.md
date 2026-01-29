# GSAP SplitText Component Usage Guide

This component provides a React wrapper around GSAP's SplitText plugin for creating smooth text animations. The SplitText plugin is now free and included with GSAP.

## Installation

The component uses GSAP which is already installed in your project. No additional installation is needed.

## Basic Usage

```tsx
import SplitTextComponent from './components/SplitText';

// Simple character animation
<SplitTextComponent
  className="text-4xl font-bold"
  animationType="chars"
  trigger="onMount"
>
  Hello World
</SplitTextComponent>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | The text content to animate |
| `className` | string | '' | CSS classes for styling |
| `animationType` | string | 'chars' | Type of split: 'chars', 'words', 'lines', 'charsAndWords', 'charsAndLines', 'wordsAndLines', 'all' |
| `stagger` | number | 0.02 | Delay between each element animation |
| `duration` | number | 0.8 | Animation duration in seconds |
| `delay` | number | 0 | Initial delay before animation starts |
| `ease` | string | 'power2.out' | GSAP easing function |
| `from` | string | 'bottom' | Starting position: 'top', 'bottom', 'left', 'right', 'center' |
| `opacity` | boolean | true | Whether to animate opacity |
| `scale` | boolean | false | Whether to animate scale |
| `rotation` | boolean | false | Whether to animate rotation |
| `y` | number | 50 | Y-axis offset for position animations |
| `x` | number | 0 | X-axis offset for position animations |
| `trigger` | string | 'onMount' | Trigger type: 'onMount', 'onScroll', 'onHover', 'manual' |
| `triggerElement` | RefObject | - | Element to use for scroll trigger |
| `scrollTrigger` | object | - | ScrollTrigger configuration |

## Animation Types

### 1. Character Animation
```tsx
<SplitTextComponent
  animationType="chars"
  stagger={0.03}
  from="bottom"
>
  Each character animates individually
</SplitTextComponent>
```

### 2. Word Animation
```tsx
<SplitTextComponent
  animationType="words"
  stagger={0.1}
  from="left"
>
  Words animate as complete units
</SplitTextComponent>
```

### 3. Line Animation
```tsx
<SplitTextComponent
  animationType="lines"
  stagger={0.2}
  from="top"
>
  This is line one.
  This is line two.
  This is line three.
</SplitTextComponent>
```

### 4. Combined Animations
```tsx
<SplitTextComponent
  animationType="charsAndWords"
  stagger={0.05}
  from="center"
  scale={true}
>
  Characters and words work together
</SplitTextComponent>
```

## Trigger Types

### 1. On Mount (Default)
```tsx
<SplitTextComponent
  trigger="onMount"
  delay={0.5}
>
  Animates when component mounts
</SplitTextComponent>
```

### 2. On Scroll
```tsx
<SplitTextComponent
  trigger="onScroll"
  scrollTrigger={{
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  }}
>
  Animates when scrolled into view
</SplitTextComponent>
```

### 3. On Hover
```tsx
<SplitTextComponent
  trigger="onHover"
  duration={0.5}
  from="top"
>
  Hover over this text
</SplitTextComponent>
```

## Advanced Examples

### Hero Section
```tsx
<section className="hero">
  <SplitTextComponent
    className="text-6xl font-bold text-white mb-6"
    animationType="chars"
    stagger={0.05}
    duration={1}
    from="bottom"
    trigger="onMount"
  >
    Welcome to Our Site
  </SplitTextComponent>
  
  <SplitTextComponent
    className="text-xl text-gray-300"
    animationType="words"
    stagger={0.1}
    duration={0.8}
    delay={1}
    from="top"
    trigger="onMount"
  >
    Experience amazing text animations
  </SplitTextComponent>
</section>
```

### Interactive Button
```tsx
<SplitTextComponent
  className="text-2xl font-bold cursor-pointer hover:text-blue-500"
  animationType="chars"
  stagger={0.02}
  duration={0.3}
  from="center"
  scale={true}
  trigger="onHover"
>
  Click Me
</SplitTextComponent>
```

### Scroll-Triggered Content
```tsx
<div className="content-section">
  <SplitTextComponent
    className="text-3xl font-bold mb-4"
    animationType="words"
    stagger={0.2}
    duration={0.8}
    from="left"
    trigger="onScroll"
    scrollTrigger={{
      start: "top 70%",
      markers: false
    }}
  >
    This content animates on scroll
  </SplitTextComponent>
  
  <SplitTextComponent
    className="text-lg text-gray-600"
    animationType="lines"
    stagger={0.3}
    duration={1}
    from="bottom"
    trigger="onScroll"
    delay={0.5}
  >
    This is the first paragraph of content.
    This is the second paragraph with more details.
    And this is the final paragraph wrapping up.
  </SplitTextComponent>
</div>
```

## Customization Tips

### 1. Different Easing Functions
```tsx
// Bounce effect
<SplitTextComponent ease="bounce.out" />

// Elastic effect
<SplitTextComponent ease="elastic.out" />

// Custom cubic-bezier
<SplitTextComponent ease="power3.inOut" />
```

### 2. Complex Stagger Patterns
```tsx
// Fast character reveal
<SplitTextComponent stagger={0.01} />

// Slow word reveal
<SplitTextComponent stagger={0.5} />

// Medium line reveal
<SplitTextComponent stagger={0.2} />
```

### 3. Multiple Animation Properties
```tsx
<SplitTextComponent
  opacity={true}
  scale={true}
  rotation={true}
  from="center"
  duration={1.2}
>
  Complex animation with multiple effects
</SplitTextComponent>
```

## Performance Tips

1. **Use appropriate animation types**: Use 'chars' for short text, 'words' for longer text, and 'lines' for paragraphs.

2. **Limit concurrent animations**: Don't animate too many text elements simultaneously.

3. **Use scroll triggers wisely**: Only use scroll triggers for elements that need them.

4. **Clean up properly**: The component automatically cleans up SplitText instances on unmount.

## Browser Support

This component works with all modern browsers that support GSAP. The SplitText plugin is included with GSAP and doesn't require additional licensing.

## Demo

Visit `/split-text-demo` to see all animation types in action with different configurations.


      {/* First row - slides left */}
      <div className="relative flex overflow-x-hidden mb-8">
        <div className="flex animate-marquee-left whitespace-nowrap">
          {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
            <div key={index} className="flex items-center mx-8">
              <img
                src={brand.logo}
                alt=""
                className="w-50 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
        <div className="flex animate-marquee-left whitespace-nowrap absolute top-0">
          {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
            <div key={`duplicate-${index}`} className="flex items-center mx-8">
              <img
                src={brand.logo}
                alt=""
                className="w-50 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Second row - slides right */}
      <div className="relative flex overflow-x-hidden">
        <div className="flex animate-marquee-right whitespace-nowrap">
          {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
            <div key={index} className="flex items-center mx-8">
              <img
                src={brand.logo}
                alt=""
                className="w-20 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
        <div className="flex animate-marquee-right whitespace-nowrap absolute top-0">
          {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
            <div
              key={`duplicate-right-${index}`}
              className="flex items-center mx-8"
            >
              <img
                src={brand.logo}
                alt=""
                className="w-20 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>