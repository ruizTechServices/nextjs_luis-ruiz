import React, { useEffect } from 'react';

const ScriptProjects = () => {
  useEffect(() => {
    // Define the custom element
    if (!customElements.get('script-projects')) {
      class ScriptProjects extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
          this.size = 200;
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
          const style = `
            canvas {
              border: 2px black solid;
              display: block;
            }
            .controls {
              display: flex;
              justify-content: space-around;
              padding: 5px 0;
            }
            label {
              font-size: 14px;
            }
          `;

          const template = `
            <style>${style}</style>
            <canvas width="${this.size}" height="${this.size}"></canvas>
            ${
              this.getAttribute("type") === "paint"
                ? `
              <div class="controls">
                <label>Color: <input type="color" id="col" value="#333333"></label>
                <label>Size: <input type="range" id="sz" min="1" max="20" value="2"></label>
              </div>
            `
                : ""
            }
          `;

          this.shadowRoot.innerHTML = template;
        }

        _initStatic() {
          this.shapes = [
            { type: 'rect', x: 20, y: 20, width: 80, height: 40, color: '#4CAF50', hover: false },
            { type: 'strokeRect', x: 20, y: 80, width: 80, height: 40, color: '#FF5722', hover: false },
            { type: 'text', text: 'Hi!', x: 80, y: 170, color: '#000', hover: false, width: 40, height: 24 } // Approximate bounding box for text
          ];

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
                this.drawStatic();
              }
            });
          };

          this.canvas.addEventListener('mousemove', this.handleMouseMove);
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
    <div className="flex items-center justify-center gap-10 my-20 border border-gray-200 p-10 rounded-lg mx-10">
      <script-projects type="static"></script-projects>{/*static WE ARE WORKING ON THIS ONE> LEAVE THE OTHERS AS IS*/}
      <script-projects type="animation"></script-projects>{/*animation*/}
      <script-projects type="interactive-ball"></script-projects>{/*interactive-ball*/}
      <script-projects type="chart"></script-projects>{/*chart*/}
      <script-projects type="paint"></script-projects>{/*paint*/}
    </div>
  );
};

export default ScriptProjects;