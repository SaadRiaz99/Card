import turtle
import math
import time
import random


def heart_point(t, scale=20, offset=(0, 0)):
    # Classic heart parametric equation
    x = 16 * math.sin(t) ** 3
    y = 13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t)
    return (offset[0] + x * scale, offset[1] + y * scale)


def rgb(r, g, b):
    return (r / 255.0, g / 255.0, b / 255.0)


class NeonHeartAnimation:
    def __init__(self, width=900, height=900):
        self.screen = turtle.Screen()
        self.screen.setup(width, height)
        self.screen.title("Happy Birthday — Saad Bin Riaz")
        # Elegant deep midnight blue background
        self.screen.bgcolor('#020210') 
        turtle.colormode(1.0)

        # Master turtles for layers
        self.bg_turtle = turtle.Turtle(visible=False)
        self.heart_t = turtle.Turtle(visible=False)
        self.text_t = turtle.Turtle(visible=False)
        self.date_t = turtle.Turtle(visible=False)
        
        self.star_turtles = []
        self.particles = []

        self.screen.tracer(0, 0)

        # Center and precompute heart points
        self.center = (0, -18)
        self.pts = [heart_point(t, scale=20, offset=self.center) for t in [i * 2 * math.pi / 600 for i in range(601)]]

    def make_stars_and_particles(self, n_stars=120, n_particles=40):
        # Create Stars
        for _ in range(n_stars):
            t = turtle.Turtle(visible=False)
            t.penup()
            # Fill the screen but avoid the very center
            while True:
                x = random.randint(-440, 440)
                y = random.randint(-440, 440)
                if math.sqrt(x**2 + y**2) > 180 or y > 100: 
                    break
            
            t.goto(x, y)
            t.shape('circle')
            size = random.choice([0.2, 0.3, 0.4, 0.5])
            t.shapesize(size)
            
            # Star colors: White, Pale Blue, or Soft Yellow
            color_choice = random.choice([
                (1.0, 1.0, 1.0),          # White
                (0.8, 0.9, 1.0),          # Blue-ish
                (1.0, 1.0, 0.85)          # Yellow-ish
            ])
            t.color(color_choice)
            t.showturtle()
            self.star_turtles.append({
                't': t, 
                'phase': random.random() * 2 * math.pi,
                'base_size': size,
                'color': color_choice
            })

        # Create Firefly Particles (Golden floating particles)
        for _ in range(n_particles):
            p = turtle.Turtle(visible=False)
            p.penup()
            x = random.randint(-420, 420)
            y = random.randint(-420, 420)
            p.goto(x, y)
            p.shape('circle')
            p.shapesize(random.uniform(0.3, 0.7))
            # Golden/Orange fireflies
            p.color((1.0, 0.7, 0.2)) 
            p.showturtle()
            self.particles.append({
                't': p, 
                'vy': random.uniform(0.1, 0.4), 
                'vx': random.uniform(-0.1, 0.1),
                'phase': random.random() * 2 * math.pi
            })

    def animate_background(self, frames=1):
        # Twinkle Stars
        for s in self.star_turtles:
            phase = s['phase'] + 0.04
            s['phase'] = phase
            # Size pulsing for twinkle effect
            factor = 0.5 + 0.5 * math.sin(phase)
            new_size = s['base_size'] * (0.6 + 0.8 * factor)
            s['t'].shapesize(new_size)
            
            # Brightness variation
            c = s['color']
            bright_factor = 0.6 + 0.4 * factor
            s['t'].color((c[0]*bright_factor, c[1]*bright_factor, c[2]*bright_factor))

        # Animate Fireflies
        for p in self.particles:
            t = p['t']
            x, y = t.position()
            y += p['vy']
            x += p['vx']
            
            if y > 450:
                y = -450
                x = random.randint(-360, 360)
            
            # Firefly blinking logic
            p['phase'] += 0.1
            blink = math.sin(p['phase'])
            if blink > 0.7:
                t.color((1.0, 0.85, 0.3)) # Bright yellow
                t.shapesize(0.8)
            else:
                t.color((0.4, 0.3, 0.1)) # Dim (off)
                t.shapesize(0.4)
                
            t.goto(x, y)

    def color_gradient(self, i, total):
        # Vibrant Neon Gradient: Pink -> Violet -> White
        t = i / total
        
        if t < 0.5:
            # Pink to Violet
            r = 1.0
            g = 0.4 - 0.2 * (t * 2)
            b = 0.6 + 0.4 * (t * 2)
        else:
            # Violet to bright White-Pink
            t2 = (t - 0.5) * 2
            r = 1.0
            g = 0.2 + 0.8 * t2
            b = 1.0
            
        return (r, g, b)

    def trace_heart_outline(self):
        # Draw glow passes first (soft thick strokes behind)
        # Neon Night Colors: Purple outer, Hot Pink inner
        passes = [
            (20, (0.5, 0.0, 0.8)),  # Deep Violet Glow
            (12, (0.9, 0.2, 0.9)),  # Bright Magenta Glow
            (6,  (1.0, 0.4, 0.7)),  # Hot Pink
            (3,  (1.0, 0.9, 1.0))   # White-Pink Core
        ]
        
        for w, c in passes:
            self.heart_t.clear()
            self.heart_t.width(w)
            self.heart_t.penup()
            px, py = self.pts[0]
            self.heart_t.goto(px, py)
            self.heart_t.pendown()
            self.heart_t.color(c)
            for (i, (x, y)) in enumerate(self.pts):
                self.heart_t.goto(x, y)
            self.screen.update()
            time.sleep(0.02)

        # Actual tracing animation with gradient
        self.heart_t.clear()
        self.heart_t.width(3)
        self.heart_t.penup()
        start = self.pts[0]
        self.heart_t.goto(start)
        self.heart_t.pendown()
        total = len(self.pts)
        for i, (x, y) in enumerate(self.pts):
            col = self.color_gradient(i, total)
            self.heart_t.color(col)
            self.heart_t.goto(x, y)
            if i % 3 == 0:
                self.screen.update()
            time.sleep(0.004)
        self.screen.update()

    def draw_watermark(self):
        t = self.bg_turtle
        t.clear()
        t.penup()
        # Very faint dark blue watermark
        t.color((0.1, 0.1, 0.2))
        t.goto(-140, 40)
        t.write("SP", align='center', font=('Arial', 140, 'bold'))
        t.goto(160, -120)
        t.write("2425", align='center', font=('Arial', 96, 'bold'))
        self.screen.update()

    def write_date(self):
        self.date_t.clear()
        self.date_t.penup()
        self.date_t.goto(0, 220)
        self.date_t.hideturtle()
        for i in range(100):
            t = 0.5 + 0.5 * math.sin(i * 0.06)
            # Soft Moonlight White
            col = (0.9, 0.9, 1.0)
            self.date_t.color(col)
            self.date_t.clear()
            self.date_t.write("24 Feb", align='center', font=('Georgia', 28, 'bold'))
            self.animate_background()
            self.screen.update()
            time.sleep(0.02)

    def write_name_typing(self, name="Saad Bin Riaz"):
        w = self.text_t
        w.clear()
        w.penup()
        w.goto(0, -10)
        w.hideturtle()
        
        # Neon Glow Effect
        for glow in range(3, 0, -1):
            w.clear()
            # Bright neon pink glow
            w.color((1.0, 0.4 + glow*0.1, 0.8 - glow*0.1))
            w.write(name, align='center', font=('Georgia', 34 + glow*2, 'bold'))
            self.screen.update()
            time.sleep(0.06)

        # Typing Animation
        typed = ""
        for ch in name:
            typed += ch
            w.clear()
            # Main text (White)
            w.goto(0, -10)
            w.color((1.0, 1.0, 1.0))
            w.write(typed, align='center', font=('Georgia', 36, 'bold'))
            self.screen.update()
            time.sleep(0.12)

    def write_message(self):
        t = turtle.Turtle(visible=False)
        t.penup()
        t.goto(0, -180)
        t.color((1, 0.85, 0.9))
        t.write("Happy Birthday ✨", align='center', font=('Georgia', 20, 'normal'))
        self.screen.update()

    def heartbeat_pulse(self, cycles=18):
        for i in range(cycles):
            k = 1 + 0.02 * math.sin(i * 0.9)
            
            self.heart_t.clear()
            
            # Draw pulsing heart
            passes = [
                (20, (0.5, 0.0, 0.8)),
                (6,  (1.0, 0.4, 0.8)),
                (3,  (1.0, 0.9, 1.0))
            ]
            
            for w, c in passes:
                self.heart_t.width(w)
                self.heart_t.color(c)
                self.heart_t.penup()
                self.heart_t.goto(self.pts[0][0] * k, self.pts[0][1] * k)
                self.heart_t.pendown()
                for (x, y) in self.pts:
                    self.heart_t.goto(x * k, y * k)

            self.animate_background()
            self.screen.update()
            time.sleep(0.05)

    def run(self):
        self.draw_watermark()
        self.make_stars_and_particles()
        
        # Initial scene setting animation
        self.animate_background()
        self.screen.update()
        time.sleep(1)

        self.trace_heart_outline()
        self.write_date()
        self.write_name_typing()
        self.write_message()
        self.heartbeat_pulse()

        try:
            while True:
                self.animate_background()
                # Subtle pulse animation in idle loop
                pulse = 0.9 + 0.1 * math.sin(time.time() * 1.5)
                self.heart_t.color((1.0, pulse, 0.9))
                self.screen.update()
                time.sleep(0.04)
        except turtle.Terminator:
            pass


if __name__ == '__main__':
    anim = NeonHeartAnimation()
    anim.run()