'use client';
import React, { useEffect } from 'react';

const ScriptProjects = () => {
  useEffect(() => {
    // Define the custom element
    if (!customElements.get('script-projects')) {
      class ScriptProjects extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
          this.size = 300;
        }

        connectedCallback() {
          const type = this.getAttribute("type") || "static";
          this._render();

          this.canvas = this.shadowRoot.querySelector("canvas");
          this.ctx = this.canvas.getContext("2d");

          switch (type) {
            case "animation":
              this._initAnimation();
              break;
            case "chart":
              this._initChart();
              break;
            case "interactive-ball":
              this._initInteractiveBall();
              break;
            case "paint":
              this._initPaint();
              break;
            case "static":
            default:
              this._initStatic();
              break;
          }
        }

        _render() {
          const type = this.getAttribute("type");
          // --- STYLE MODIFICATION --- 
          // You can modify the styles here to change the appearance of the paint tool.
          const style = `
            /* This is the main container for the paint tool. 
               We use flexbox to position the canvas and controls side-by-side. */
            .paint-container {
              display: flex;
              align-items: flex-start; /* You can change this to 'center' or 'flex-end' */
              gap: 15px; /* This is the space between the canvas and the controls */
            }

            canvas {
              border: 2px black solid;
              /* The canvas is now a flex item, so 'display: block' is not needed */
            }

            /* This is the container for the color and size controls.
               We use flexbox with a column direction to stack them vertically. */
            .controls {
              display: flex;
              flex-direction: column; /* Stacks controls top-to-bottom */
              justify-content: flex-start;
              gap: 20px; /* This is the space between the color and size controls */
              padding-top: 5px; /* Adds a little space at the top */
            }

            label {
              font-size: 14px;
              display: flex;
              flex-direction: column; /* Stacks the label text above its input control */
              gap: 5px; /* Space between the label text and the input */
            }
            
            .chart-container {
              display: flex;
              align-items: flex-start; /* You can change this to 'center' or 'flex-end' */
              gap: 15px; /* This is the space between the canvas and the controls */
            }

            canvas {
              border: 2px black solid;
              /* The canvas is now a flex item, so 'display: block' is not needed */
            }

            /* This is the container for the color and size controls.
               We use flexbox with a column direction to stack them vertically. */
            .controls {
              display: flex;
              flex-direction: column; /* Stacks controls top-to-bottom */
              justify-content: flex-start;
              gap: 20px; /* This is the space between the color and size controls */
              padding-top: 5px; /* Adds a little space at the top */
            }

            label {
              font-size: 14px;
              display: flex;
              flex-direction: column; /* Stacks the label text above its input control */
              gap: 5px; /* Space between the label text and the input */
            }
          `;

          // --- TEMPLATE MODIFICATION ---
          // The HTML structure is defined here.
          const template = `
            <style>${style}</style>
            ${type === "paint"
              ? `
              <div class="paint-container">
                <canvas width="${this.size}" height="${this.size}"></canvas>
                <div class="controls">
                  <label>Color: <input type="color" id="col" value="#333333"></label>
                  <label>Size: <input type="range" id="sz" min="1" max="20" value="2"></label>
                </div>
              </div>
            `
              : type === "chart"
                ? `
              <div class="chart-container">
                <canvas width="${this.size}" height="${this.size}"></canvas>
                <div class="chart-legend">
                  <h3>Data Visualization</h3>
                  <div class="chart-info">Bar Chart</div>
                </div>
              </div>
            `
                : `
              <canvas width="${this.size}" height="${this.size}"></canvas>
            `
            }
          `;

          this.shadowRoot.innerHTML = template;
        }

        _initStatic() {
          this.shapes = [
            { type: 'rect', x: 120, y: 120, width: 100, height: 100, color: '#4CAF50', hover: false, dragging: false },
            { type: 'strokeRect', x: 20, y: 80, width: 80, height: 40, color: '#FF5722', hover: false, dragging: false },
            { type: 'text', text: 'Hi!', x: 80, y: 170, color: '#000', hover: false, dragging: false, width: 40, height: 24 }
          ];

          this.activeShape = null;
          this.offsetX = 0;
          this.offsetY = 0;

          this.drawStatic = () => {
            const ctx = this.ctx;
            ctx.clearRect(0, 0, this.size, this.size);
            this.shapes.forEach(shape => {
              ctx.save();
              if (shape.hover) {
                ctx.shadowColor = 'rgba(0,0,0,0.5)';
                ctx.shadowBlur = 10;
              }
              switch (shape.type) {
                case 'rect':
                  ctx.fillStyle = shape.color;
                  ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
                  break;
                case 'strokeRect':
                  ctx.strokeStyle = shape.color;
                  ctx.lineWidth = 4;
                  ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
                  break;
                case 'text':
                  ctx.font = "24px Arial";
                  ctx.fillStyle = shape.color;
                  ctx.fillText(shape.text, shape.x, shape.y);
                  break;
              }
              ctx.restore();
            });
          };

          this.handleMouseMove = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Handle dragging
            if (this.activeShape && this.activeShape.dragging) {
              this.activeShape.x = mouseX - this.offsetX;
              this.activeShape.y = mouseY - this.offsetY;
              this.drawStatic();
              return;
            }
            
            // Handle hover
            let needsRedraw = false;
            this.shapes.forEach(shape => {
              const isOver = mouseX >= shape.x && mouseX <= shape.x + shape.width &&
                mouseY >= shape.y && mouseY <= shape.y + shape.height;
              if (isOver !== shape.hover) {
                shape.hover = isOver;
                needsRedraw = true;
              }
            });

            if (needsRedraw) {
              this.drawStatic();
            }
          };

          this.handleMouseDown = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Find the topmost shape under the cursor (reverse to check from top to bottom)
            for (let i = this.shapes.length - 1; i >= 0; i--) {
              const shape = this.shapes[i];
              const isOver = mouseX >= shape.x && mouseX <= shape.x + shape.width &&
                mouseY >= shape.y && mouseY <= shape.y + shape.height;
              
              if (isOver) {
                this.activeShape = shape;
                shape.dragging = true;
                this.offsetX = mouseX - shape.x;
                this.offsetY = mouseY - shape.y;
                break;
              }
            }
          };

          this.handleMouseUp = () => {
            if (this.activeShape) {
              this.activeShape.dragging = false;
              this.activeShape = null;
            }
          };

          this.handleClick = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            this.shapes.forEach(shape => {
              const isOver = mouseX >= shape.x && mouseX <= shape.x + shape.width &&
                mouseY >= shape.y && mouseY <= shape.y + shape.height;
              if (isOver) {
                // Change color on click
                shape.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
                
                // If it's a text shape, prompt for new text
                if (shape.type === 'text') {
                  const newText = prompt('Enter new text:', shape.text);
                  if (newText !== null) {
                    shape.text = newText;
                    // Update width based on new text (approximate)
                    shape.width = newText.length * 12;
                  }
                }
                
                this.drawStatic();
              }
            });
          };

          this.canvas.addEventListener('mousemove', this.handleMouseMove);
          this.canvas.addEventListener('mousedown', this.handleMouseDown);
          this.canvas.addEventListener('mouseup', this.handleMouseUp);
          this.canvas.addEventListener('click', this.handleClick);

          this.drawStatic();
        }

        _initAnimation() {
          let x = this.size / 2,
            y = this.size / 2,
            vx = 1.5,
            vy = 1,
            r = 10;

          const loop = () => {
            this.ctx.clearRect(0, 0, this.size, this.size);
            x += vx;
            y += vy;

            if (x + r > this.size || x - r < 0) vx = -vx;
            if (y + r > this.size || y - r < 0) vy = -vy;

            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, Math.PI * 2);
            this.ctx.fillStyle = "#2196F3";
            this.ctx.fill();

            this.animationFrameId = requestAnimationFrame(loop);
          };
          loop();
        }

        _initInteractiveBall() {
          let r = 25;
          let x = this.size / 2;
          let y = this.size / 2;
          let vx = 0;
          let vy = 0;

          const pokeStrength = 15;
          const friction = 0.985;

          let animationId = null;
          this.ctx.font = "14px Arial";

          const draw = () => {
            this.ctx.clearRect(0, 0, this.size, this.size);
            this.ctx.fillStyle = "#aaa";
            this.ctx.fillText("Poke the ball", 55, this.size - 15);
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsl(${Math.abs(vx + vy) * 10}, 80%, 60%)`;
            this.ctx.fill();
          };

          const animate = () => {
            vx *= friction;
            vy *= friction;
            x += vx;
            y += vy;

            if (x + r > this.size) {
              x = this.size - r;
              vx *= -1;
            } else if (x - r < 0) {
              x = 0 + r;
              vx *= -1;
            }
            if (y + r > this.size) {
              y = this.size - r;
              vy *= -1;
            } else if (y - r < 0) {
              y = 0 + r;
              vy *= -1;
            }

            draw();

            if (Math.abs(vx) < 0.1 && Math.abs(vy) < 0.1) {
              cancelAnimationFrame(animationId);
              animationId = null;
            } else {
              animationId = requestAnimationFrame(animate);
            }
          };

          this.canvas.addEventListener("click", (e) => {
            const angle = Math.atan2(y - e.offsetY, x - e.offsetX);
            vx = Math.cos(angle) * pokeStrength;
            vy = Math.sin(angle) * pokeStrength;

            if (!animationId) {
              animate();
            }
          });

          draw();
        }

        _initChart() {
          const data = [30, 80, 45, 60, 20, 90, 50];
          const count = data.length;
          const gap = 4;
          const barWidth = (this.size - gap * (count + 1)) / count;
          const maxVal = Math.max(...data);
          const scaleY = this.size / maxVal;

          data.forEach((val, i) => {
            const h = val * scaleY * 0.9;
            const x = gap + i * (barWidth + gap);
            this.ctx.fillStyle = "#FFC107";
            this.ctx.fillRect(x, this.size - h, barWidth, h);
            this.ctx.fillStyle = "#000";
            this.ctx.font = "12px Arial";
            this.ctx.fillText(val, x + barWidth / 4, this.size - h - 5);
          });
        }

        _initPaint() {
          let drawing = false;
          const colorInput = this.shadowRoot.querySelector("#col");
          const sizeInput = this.shadowRoot.querySelector("#sz");

          const startDraw = () => (drawing = true);
          const stopDraw = () => {
            drawing = false;
            this.ctx.beginPath();
          };

          const draw = (e) => {
            if (!drawing) return;
            this.ctx.lineWidth = sizeInput.value;
            this.ctx.strokeStyle = colorInput.value;
            this.ctx.lineCap = "round";

            this.ctx.lineTo(e.offsetX, e.offsetY);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(e.offsetX, e.offsetY);
          };

          this.canvas.addEventListener("mousedown", startDraw);
          this.canvas.addEventListener("mouseup", stopDraw);
          this.canvas.addEventListener("mouseout", stopDraw);
          this.canvas.addEventListener("mousemove", draw);
        }

        disconnectedCallback() {
          if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
          }
          if (this.handleMouseMove) {
            this.canvas.removeEventListener('mousemove', this.handleMouseMove);
          }
          if (this.handleClick) {
            this.canvas.removeEventListener('click', this.handleClick);
          }
        }
      }

      customElements.define("script-projects", ScriptProjects);
    }
  }, []);

  return (
    <div className="container mx-auto flex flex-col gap-12 p-4 lg:p-8">
      {[
        { type: "static", title: "Static Canvas", description: "When you click on the boxes, or text, it will change color." },
        { type: "animation", title: "Animation Demo", description: "Canvas animation with smooth transitions. It's a ball bouncing around the screen." },
        { type: "interactive-ball", title: "Interactive Ball", description: "Click to poke the ball and watch it bounce. It follows physics concepts." },
        { type: "chart", title: "Data Visualization", description: "Simple bar chart visualization using canvas" },
        { type: "paint", title: "Paint App", description: "Basic drawing application with color selection" }
      ].map((project, idx) => {
        const rowDir = idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse';
        
        return (
          <section
            key={project.type}
            className={`flex flex-col ${rowDir} items-center`}
          >
            <div className="w-full md:w-2/3 flex justify-center">
              <script-projects type={project.type}></script-projects>
            </div>
            
            <div className="w-full md:w-1/3 space-y-4 text-center md:text-left">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-600">
                {project.description}
              </p>
              {/* <button 
                className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                onClick={() => alert(`${project.title} functionality would be expanded here`)}
              >
                Try it&nbsp;→
              </button> */}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default ScriptProjects;