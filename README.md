# Audio-Visualizer Interactive Project

Welcome to the GitHub repository of my interactive audio-visualizer project. This visualization dynamically responds to an audio input and user interactions to create a interesting visual experience.

## How to Interact with the Visualizer

To engage with the visualizer, please follow these instructions:

- **Starting the Experience**: Simply load the page.
- **Controlling Volume**: Move your mouse vertically across the screen to adjust the audio volume. The volume increases as the mouse moves upward.
- **Playing and Pausing**: Click anywhere on the screen to toggle the playback of the music. Upon your first interaction, the music will start playing, synchronized with the visual effects.

## Individual Approach to Animation

For this group project, I focused on enhancing the interactivity and dynamic responses of the visualizer based on **audio**.

### Properties Animated

I animated almost all of the original graphics, except for the background and the pink curve. I tried an animated background, and I found that the graphics combined with the animated colours were a bit too shaky for my eyes. The pink curve, on the other hand, I tried to make the pink curve also follow the music to be dynamically generated in the centre of the graphic, but the actual result didn't work well for me, so I left it as a comment in my code.

- **Color Dynamics**: My contribution primarily alters the color properties based on the audio's frequency and amplitude, creating a more vibrant and engaging color spectrum transition. In order to differentiate between the different graphics, I chose to add the colourInt parameter to the original graphic to allow for soft colour variations. And replaced the random() used in the group work, which would have given my graphic uncontrollable drastic colour changes and flickering while playing music.
- **Circle Expansion**: I implemented a feature where circle sizes dynamically expand and contract not just with the beat of the music but also in response to the cursor’s distance from the center of the canvas, offering a unique interaction different from the typical audio-driven size adjustments. And the generation of concentric circles looks like it's spinning in dynamic colours, which is a deliberate visual effect.

## Inspiration and References

The animation style is inspired by classic audio visualisations that use music to drive the animation. The size and colour of the circles in my visualisations, which bounce to the rhythm of the music, reflect this inspiration.



![Inspiration Image](https://img-blog.csdnimg.cn/img_convert/68ab4e2da20f58afd4ce5c469c31407c.gif)

Originally, I wanted to implement the chain part to follow the rotation of the music playback, but in the end, I didn't figure out how to implement it, so I left it alone.

![Inspiration Image 2](https://img-blog.csdnimg.cn/20210217125018677.gif)

## Technical Implementation

### Audio Processing with FFT
- **Fast Fourier Transform**: The core of the audio analysis, the FFT function provided by p5.js, processes the audio signal to compute its frequency spectrum in real-time. This data drives the visual changes in the visualizer, linking visual dynamics directly to audio metrics like amplitude and frequency.
- **Audio Connection**: I load and manage the audio within the p5.js environment using its `loadSound` function, ensuring that the visualizer has direct access to real-time audio data.

### Dynamic Visual Rendering
- **Circle Visualization**: Circles expand and contract based on the frequency energy obtained from the FFT analysis. This size modulation is mapped from the amplitude data, providing a visual pulse that synchronizes with the beats of the music.
- **Color Dynamics**: The `fill()` function is used to dynamically change the color of visual elements. The color is determined by combining the `freqEnergy` (frequency energy from the FFT) and `colorInt` (a cyclic value that oscillates between 0 and 1). This results in a smooth transition of colors based on the audio's properties.
- **Interactive Controls**: Users can adjust the volume by moving the mouse vertically and toggle playback by clicking on the screen, making the visualizer interactive and engaging.

### Efficiency and Performance
- **Responsive Design**: The visualizer automatically adjusts its size based on the browser window dimensions, ensuring a consistent experience on both desktop and mobile devices through the use of `windowResized()` function in p5.js.

### External Tools and Techniques

- **p5.js**: This library is essential for creating graphics and interactive experiences in web browsers. I found some basic examples of functionality in the library for drawing graphics and animations based on audio data.

- **ChatGPT**: During the coding process, I used ChatGPT. This tool was highly effective in helping me review the code I had already written. By integrating the error messages from the console, it could quickly pinpoint the errors in my code. I also attempted to use GPT to generate some effects, but the outcomes were not quite as expected, possibly because the information and requirements I provided were not comprehensive enough. Additionally, I used GPT as a translation tool, and it performed very well in that capacity.

- **DeepL**: Part of my comments and part of the README were translated using this translation software.

- **My Friends**:I have communicated with my group members and my friends during the creation of my code. For example, controlling the rate of colour change through colourInt came out of those discussions, thanks to them.


## Modifications to Group Code
- **Introduction of Audio Processing**
  - **Original**: The original code did not include audio processing capabilities.
  - **Modified**: Integrated the `p5.FFT` object to analyze audio frequency and amplitude in real time. This addition allows the visualization to dynamically respond to the audio input.

- **Dynamic Color Adjustments**
  - **Original**: Used `randomColor()` function for static random color generation without any audio influence.
  - **Modified**: Modified color generation to depend on the audio's frequency data (`freqEnergy`). Use `freqEnergy` to implement the colour change, dynamically connecting the colour to the audio attributes. And use `colourInt` to control the rate of colour change.

- **Enhanced Interactivity**
  - **Original**: No interactive controls were implemented for user interaction with the audio.
  - **Modified**: Added volume control through vertical mouse movement and interactive play/pause functionality by integrating `mouseMoved()` and `mousePressed()` functions, respectively. These features allow users to control the audio directly through interface actions.

- **Dynamic visual elements**
  - Original**: Static images.
  - Modified**: Developed more complex visualisations. Size and shape changes of graphics are controlled through `freqEnergy`, synchronised with audio rhythms and colour changes.


## Credits and Acknowledgments

- **p5.js Library**: Essential for creating graphics and interactive experiences. [p5.js Official Website](https://p5js.org/)
- **ChatGPT**: Assisted in debugging, code review, and documentation. [OpenAI ChatGPT](https://openai.com/chatgpt)
- **DeepL**: Used for translating parts of the documentation to ensure clarity and accessibility. [DeepL Translator](https://www.deepl.com/translator)
