# Claim Template

Welcome to the **Claim Template** app! This guide will walk you through customizing the appearance of this app, from adding images to buttons, tweaking background effects, and experimenting with blend modes and gradients.

## Setting a Background for the Main Body

To add a background image or color to the main body:

1. Open the `globals.css` file located in the root of your project.
2. On **line 13**, you’ll see the default setting for the background. Comment out this line.
3. On **line 14**, uncomment the alternative background to enable it.

```css
/* line 13 */
/* background: var(--background-color); */
```

```css
/* line 14 */
background: var(--background-color) var(--background) no-repeat center center;
```

4. You can further enhance the look by adjusting the **background-blend-mode** on **line 16**. This property controls how your background blends with any other colors. Here are a few options:

   - `normal`: Displays the image normally with no blending.
   - `multiply`: Darkens the background by multiplying the colors.
   - `screen`: Lightens the background by inversely multiplying the colors.
   - `overlay`: Combines `multiply` and `screen` for a balanced blend.
   - `darken`: Displays the darkest colors from both layers.
   - `lighten`: Displays the lightest colors from both layers.

     Experiment with different blend modes for unique visual effects!

## Adding an Image to the Main Page Button

To add an image to the main button on the home page, follow these steps:

1. Open the `page.tsx` file.
2. Navigate to **line 106**.
3. Uncomment the `style` traits for the button to set the background image, size, and position.

```tsx
// style={{
//   backgroundImage: "url('/blue-background.jpg')",
//   backgroundSize: "cover",
//   backgroundPosition: "center"
// }}
```

You can change the image in the public folder to be whatever you would like.

## Enabling Gradient on the Claim section buttons

To add a gradient effect to the buttons in the claim section:

1. Open the `MainBtn.tsx` file.
2. Go to **line 21**.
3. Uncomment the line to activate the gradient background for the button.

```tsx
// "bg-gradient-to-r from-purple-950 via-blue-950 to-green-950",
```

You should feel free to play with different colors here, [HERE](https://tailwindcolor.com/) is a link to tailwinds different color classes.
