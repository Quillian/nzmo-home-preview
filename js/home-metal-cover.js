/*
 * Chrome Arcs shader by Louis Studios.
 * https://21st.dev/@louisstudios/components/chrome-arcs
 * Copyright (c) Louis Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

// Every constant below was fitted to the reference, then checked by eye side by side.
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform vec4 uView;   // view centre (reference px), reference px per device px, ring density
uniform vec3 uMotion; // outward flow (rings, 0..1), light shift (reference px), streak intensity
uniform mat3 uTint;   // maps the dispersed red, green, blue sheen to the tint colours
uniform float uSeed;

// Rings: circles about a centre far off to the lower right. Ring k sits at radius
// R0 - D1 * Q^(k - 1), so the bands widen by 7% per ring towards the centre, as in the reference.
const vec2 C = vec2(3777.39, 2674.21);
const float R0 = 6657.9;
const float D1 = 2264.66;
const float LNQ = 0.0670042;

float sq(float x) { return x * x; }

// Streak shape: white core width and each channel's outer and inner tail (band widths).
const float CORE = 0.24;
const vec2 TAIL_R = vec2(0.40033, 0.33513);
const vec2 TAIL_G = vec2(0.38067, 0.32096);
const vec2 TAIL_B = vec2(0.35736, 0.32278);
const float BLOOM = 2.2;
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

// The reference rings are not quite concentric: a small cubic nudge, frozen at the frame edge.
float nudge(vec2 p) {
  vec2 q = clamp(p, vec2(0.0), vec2(1179.0, 1967.0)) / 1000.0 - vec2(0.6, 1.0);
  float X = q.x, Y = q.y;
  return -0.01066 + Y * (-0.0588 + Y * (0.02479 + Y * 0.12054))
    + X * (0.00943 + Y * (0.08212 + Y * 0.05649)) + X * X * (0.06149 - 0.00377 * Y) - 0.01411 * X * X * X;
}

// Smooth lighting envelopes over the frame: log brightness as a quadratic in X, Y.
float envelope(vec2 q, float a, float bx, float by, float bxx, float byy, float bxy, float cap) {
  return exp(min(a + bx * q.x + by * q.y + bxx * q.x * q.x + byy * q.y * q.y + bxy * q.x * q.y, cap));
}

// Where the ring of radius ra crosses the line x = x0 + sx (y - 1000): its angle, and y.
vec2 meet(float ra, float x0, float sx) {
  float A = x0 - 1000.0 * sx - C.x;
  float a = sx * sx + 1.0, b = 2.0 * (A * sx - C.y), c = A * A + C.y * C.y - ra * ra;
  float y = (-b - sqrt(max(b * b - 4.0 * a * c, 0.0))) / (2.0 * a);
  return vec2(atan(y - C.y, x0 + sx * (y - 1000.0) - C.x), y);
}

float radius(float k) { return R0 - D1 * exp(LNQ * (k - 1.0)); }

// Thin-film dispersion: one lobe per channel, red a little further out than green, green than
// blue. Where they overlap the streak burns white; past it red lingers longest outside, blue
// inside, so the fringes deepen to amber and blue as they fade.
float lobe(float d, float outer, float inner) {
  return 1.0 * exp(-sq(d / CORE)) + 0.31106 * exp(-abs(d) / (d > 0.0 ? outer : inner));
}
vec3 sheen(float phi) {
  return vec3(
    16.614 * lobe(phi - 0.11247, TAIL_R.x, TAIL_R.y),
    16.018 * lobe(phi + 0.040111, TAIL_G.x, TAIL_G.y),
    16.169 * lobe(phi + 0.17831, TAIL_B.x, TAIL_B.y));
}

// Linear light of render band kp at fraction t across it (0 = outer edge). env: body, back
// edge, rim and streak brightness here.
vec3 band(float kp, float t, float th, float r, float w, float aa, vec4 env) {
  float m = uView.w, flow = uMotion.x;
  // Where this band sits now, in reference rings.
  float kc = 4.5 + (kp + 0.5 - flow - 4.5) / m;

  // Body: a tube reflecting a broad soft light. It brightens slowly from the outer edge and
  // drops into shadow past the crest.
  float crest = 0.46263 + 0.070742 * (kc - 4.0) - 0.0040818 * (degrees(th) + 150.0);
  float spread = t < crest ? max(0.38553 - 0.071703 * (kc - 4.0), 0.03) : 0.12301;
  vec3 col = vec3(env.x * exp(-sq((t - crest) / spread)));
  // A faint cool lift where the band turns under, before the next rim.
  col += env.y * exp(-sq((1.0 - t) / 0.16965)) * vec3(0.55, 0.7, 1.0);

  // The streak: an arch across the band whose apex sits where the band meets the light line.
  // phi is the distance from the arch in band widths, positive outside.
  float t0 = 0.26151 + 0.032207 * (kc - 4.5);
  float ta = meet(radius(4.5 + (kp + t0 - flow - 4.5) / m), 536.54 + uMotion.y, 0.014062).x;
  float u = (th - ta) * r / w;
  float dt = t - t0;
  float bend = dt < 0.0 ? 8.3036 : 3.5178 - 0.021064 * (kc - 4.5);
  float phi = (-u + bend * dt * dt - 0.37954) * (1.0471 - 0.14429 * (kc - 4.5));
  col += uTint * sheen(phi) * env.w;
  // The apex blooms: a soft warm white glow where the arch turns, as the lens catches it.
  col += BLOOM * env.w * exp(-sq((phi - 0.12) / 0.42) - sq(dt / 0.2)) * vec3(1.0, 0.9, 0.78);

  // Rim: a hairline along the outer edge, widened to the pixel so it never shimmers. It catches
  // its own long glint where it passes the light: white along the glint, then red off the
  // outer end and blue off the inner.
  float rw = sqrt(0.000144 + aa * aa * 0.35);
  float prof = 0.012 / rw * exp(-sq(t / rw));
  if (prof > 1e-4) {
    float rk = radius(4.5 + (kp - flow - 4.5) / m);
    vec2 g = meet(rk, 613.43 + uMotion.y, 0.0);
    float s = (th - g.x) * rk;
    float hl = max(137.51 + 0.37297 * (g.y - 1000.0), 10.0);
    float o = -s - hl, i = s - hl;
    vec3 glint = exp(-max(max(vec3(o - 20.938, o, o + 31.302), vec3(i + 20.938, i, i - 31.302)), 0.0) / 76.225);
    col += prof * (vec3(env.z) + uTint * (25.0 * env.w * glint));
  }
  return col;
}

vec3 encode(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

void main() {
  vec2 fc = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 p = uView.xy + (fc - 0.5 * uRes) * uView.z;
  vec2 d = p - C;
  float r = length(d);
  float th = atan(d.y, d.x);
  float gap = max(R0 - r, 1.0);
  float m = uView.w;
  float K = 4.5 + (1.0 + log(gap / D1) / LNQ + nudge(p) - 4.5) * m + uMotion.x;
  float w = gap * LNQ / m;
  float aa = uView.z / w;

  vec2 q = clamp(p, vec2(0.0), vec2(1179.0, 1967.0)) / 1000.0 - vec2(0.6, 1.0);
  float body = envelope(q, -3.7092, 2.4996, -4.3156, -4.975, -1.6414, 0.77581, 0.5);
  vec4 env = vec4(
    body,
    min(sqrt(body) * exp(-2.9914), 1.65),
    envelope(q, -9.7404, 26.18, -13.223, -19.901, -6.2186, 16.602, 1.0),
    envelope(q, -1.8032, -1.5862, -0.34234, -12.467, -1.9718, 7.467, 1.0) * uMotion.z
  );

  float kp = floor(K);
  float t = K - kp;
  vec3 col = band(kp, t, th, r, w, aa, env);
  // Analytic coverage across the band boundary: blend in the neighbour within half a pixel.
  if (t < aa * 0.5) col = mix(band(kp - 1.0, t + 1.0, th, r, w, aa, env), col, 0.5 + t / aa);
  else if (t > 1.0 - aa * 0.5) col = mix(band(kp + 1.0, t - 1.0, th, r, w, aa, env), col, 0.5 + (1.0 - t) / aa);

  // Filmic shoulder, then sRGB, then fine grain against banding in the deep blacks.
  col = encode(1.0 - exp(-col * 0.69504));
  col += (hash(fc + uSeed) - 0.5) * (3.0 / 255.0);
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`

const hero = document.querySelector('.home-metal-cover');
const canvas = hero?.querySelector('canvas');
const canAnimate = matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');

if (hero && canvas) {
  hero.addEventListener('pointerenter', start);
}

function linkProgram(gl) {
  const shaders = [[gl.VERTEX_SHADER, VERT], [gl.FRAGMENT_SHADER, FRAG]].map(([type, source]) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  });
  const program = gl.createProgram();
  shaders.forEach(shader => gl.attachShader(program, shader));
  gl.linkProgram(program);
  shaders.forEach(shader => gl.deleteShader(shader));
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;
  gl.deleteProgram(program);
  return null;
}

function start() {
  if (!canAnimate.matches) return;
  hero.removeEventListener('pointerenter', start);
  const gl = canvas.getContext('webgl', {
    alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'low-power'
  });
  if (!gl) return;
  const program = linkProgram(gl);
  if (!program) return;

  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const resolution = gl.getUniformLocation(program, 'uRes');
  const view = gl.getUniformLocation(program, 'uView');
  const motion = gl.getUniformLocation(program, 'uMotion');
  gl.uniformMatrix3fv(gl.getUniformLocation(program, 'uTint'), false, new Float32Array([
    1, 0.57, 0.24, 0.73, 0.78, 0.82, 0.22, 0.47, 0.94
  ]));
  gl.uniform1f(gl.getUniformLocation(program, 'uSeed'), 0);

  let shift = 0;
  let target = 0;
  let frame = 0;
  let visible = true;
  let lost = false;

  function schedule() {
    if (!frame && visible && !lost && canAnimate.matches && !document.hidden) {
      frame = requestAnimationFrame(draw);
    }
  }

  function draw() {
    frame = 0;
    if (!visible || lost || !canAnimate.matches || document.hidden) return;
    shift += (target - shift) * 0.12;
    gl.uniform3f(motion, 0, shift, 0.83);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    canvas.classList.add('is-rendered');
    if (Math.abs(target - shift) > 0.15) schedule();
  }

  function resize() {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height || lost) return;
    const scale = Math.min(1, Math.sqrt(1100000 / (width * height)));
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    const span = 1179 * Math.sqrt(Math.max(1, width / height));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolution, canvas.width, canvas.height);
    gl.uniform4f(view, 537 - span * 0.28, 932, span / canvas.width, 1.17);
    schedule();
  }

  hero.addEventListener('pointermove', event => {
    const box = hero.getBoundingClientRect();
    target = ((event.clientX - box.left) / box.width - 0.5) * 200;
    schedule();
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { target = 0; schedule(); });
  canvas.addEventListener('webglcontextlost', () => {
    lost = true;
    cancelAnimationFrame(frame);
    canvas.classList.remove('is-rendered');
  }, { once: true });
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); }).observe(hero);
  document.addEventListener('visibilitychange', schedule);
  canAnimate.addEventListener('change', () => {
    if (!canAnimate.matches) canvas.classList.remove('is-rendered');
    schedule();
  });
  resize();
}
