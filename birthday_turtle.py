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
        self.screen.bgcolor('#0b0326')  # deep romantic purple/near-black
        turtle.colormode(1.0)

        # Master turtles for layers
        self.bg_turtle = turtle.Turtle(visible=False)
        self.heart_t = turtle.Turtle(visible=False)
        self.fill_t = turtle.Turtle(visible=False)
        self.text_t = turtle.Turtle(visible=False)
        self.date_t = turtle.Turtle(visible=False)
        self.star_turtles = []
        self.particles = []

        self.screen.tracer(0, 0)

        # Center and precompute heart points (center slightly lowered)
        self.center = (0, -18)
        self.pts = [heart_point(t, scale=20, offset=self.center) for t in [i * 2 * math.pi / 600 for i in range(601)]]

    def make_stars_and_particles(self, n_stars=60, n_particles=30):
        for _ in range(n_stars):
            t = turtle.Turtle(visible=False)
            t.penup()
            x = random.randint(-420, 420)
            y = random.randint(-420, 420)
            t.goto(x, y)
            t.shape('circle')
            t.shapesize(random.choice([0.06, 0.08, 0.1, 0.14]))
            # faint stars
            t.color((0.96, 0.96, 0.98))
            t.showturtle()
            self.star_turtles.append({'t': t, 'phase': random.random()*2*math.pi})

        for _ in range(n_particles):
            p = turtle.Turtle(visible=False)
            p.penup()
            x = random.randint(-420, 420)
            y = random.randint(-420, -200)
            p.goto(x, y)
            p.shape('circle')
            p.shapesize(random.uniform(0.4, 0.9))
            p.color((0.7, 0.2, 0.5))
            p.showturtle()
            self.particles.append({'t': p, 'vy': random.uniform(0.2, 0.8), 'vx': random.uniform(-0.2, 0.2)})

    def animate_background(self, frames=1):
        # subtle twinkle and floating particles
        for s in self.star_turtles:
            phase = s['phase'] + 0.08
            s['phase'] = phase
            brightness = 0.7 + 0.3 * math.sin(phase)
            # scale brightness so stars remain faint
            b = 0.65 + 0.35 * brightness
            s['t'].color((b, b, b))

        for p in self.particles:
            t = p['t']
            x, y = t.position()
            y += p['vy']
            x += p['vx']
            if y > 420:
                y = -420
                x = random.randint(-360, 360)
            t.goto(x, y)

    def color_gradient(self, i, total):
        # pinkish-red gradient along stroke
        r1, g1, b1 = (255, 102, 180)  # neon pink
        r2, g2, b2 = (255, 40, 85)    # deeper neon red
        t = i / total
        r = r1 + (r2 - r1) * t
        g = g1 + (g2 - g1) * t
        b = b1 + (b2 - b1) * t
        return rgb(r, g, b)

    def trace_heart_outline(self):
        # Draw glow passes first (soft thick strokes behind)
        passes = [18, 10, 6, 3]
        for w in passes:
            self.heart_t.clear()
            self.heart_t.width(w)
            self.heart_t.penup()
            px, py = self.pts[0]
            self.heart_t.goto(px, py)
            self.heart_t.pendown()
            c = (1, 0.5, 0.7) if w > 6 else (1, 0.2, 0.5)
            self.heart_t.color(c)
            for (i, (x, y)) in enumerate(self.pts):
                self.heart_t.goto(x, y)
            self.screen.update()
            time.sleep(0.02)

        # Actual tracing animation with gradient (outline only)
        self.heart_t.clear()
        self.heart_t.width(4)
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
            # small delay to give smooth, satisfying tracing
            time.sleep(0.006)
        # final update to ensure outline is fully visible
        self.screen.update()

    def soft_fill_heart(self):
        # Intentionally left blank: filling disabled to keep outline-only design
        return

    def draw_watermark(self):
        # Very faint watermark text behind everything
        t = self.bg_turtle
        t.clear()
        t.penup()
        # use a dim color around ~20% brightness for watermark
        t.color((0.2, 0.2, 0.2))
        t.goto(-140, 40)
        t.write("SP", align='center', font=('Arial', 140, 'bold'))
        t.goto(160, -120)
        t.write("2425", align='center', font=('Arial', 96, 'bold'))
        # one extra faint pass to ensure subtle visibility
        t.color((0.18, 0.18, 0.18))
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
        for i in range(120):
            # color shift between pale pink and soft gold
            t = 0.5 + 0.5 * math.sin(i * 0.05)
            col = (1.0, 0.8 * t, 0.9 * t)
            self.date_t.color(col)
            self.date_t.clear()
            self.date_t.write("24 Feb", align='center', font=('Georgia', 28, 'bold'))
            self.screen.update()
            time.sleep(0.02)

    def write_name_typing(self, name="Saad Bin Riaz"):
        w = self.text_t
        w.clear()
        w.penup()
        # center name slightly above heart center for better visual balance
        w.goto(0, -10)
        w.hideturtle()
        # glow base (multiple faint layers)
        for glow in range(3, 0, -1):
            w.clear()
            w.color((1, 0.75, 0.92) if glow > 1 else (1, 0.5, 0.7))
            w.write(name, align='center', font=('Georgia', 34 + glow*2, 'bold'))
            self.screen.update()
            time.sleep(0.06)

        # typing/ fade-in animation for text
        typed = ""
        for ch in name:
            typed += ch
            # draw glow behind each step
            w.clear()
            for g in range(3):
                offset = g - 1
                w.goto(0 + offset*2, -40 - offset*1)
                alpha_scale = 0.6 - 0.15 * g
                w.color((1, 0.7*alpha_scale, 0.9*alpha_scale))
                w.write(typed, align='center', font=('Georgia', 36, 'bold'))
            # main text
            w.goto(0, -10)
            w.color((1, 0.98, 1))
            w.write(typed, align='center', font=('Georgia', 36, 'bold'))
            self.screen.update()
            time.sleep(0.12)

    def write_message(self):
        t = turtle.Turtle(visible=False)
        t.penup()
        t.goto(0, -180)
        t.color((1, 0.85, 0.9))
        t.write("Happy Birthday 🎉", align='center', font=('Georgia', 20, 'normal'))
        self.screen.update()

    def heartbeat_pulse(self, cycles=18):
        # Slight heartbeat - scale the heart drawing in small oscillations
        for i in range(cycles):
            k = 1 + 0.02 * math.sin(i * 0.9)
            # redraw outline with a slight glow (several passes)
            self.heart_t.clear()
            # outer glow pass
            self.heart_t.width(8)
            self.heart_t.color((1, 0.45, 0.75))
            self.heart_t.penup()
            self.heart_t.goto(self.pts[0][0] * k, self.pts[0][1] * k)
            self.heart_t.pendown()
            for (x, y) in self.pts:
                self.heart_t.goto(x * k, y * k)

            # middle glow
            self.heart_t.width(5)
            self.heart_t.color((1, 0.3, 0.6))
            self.heart_t.penup()
            self.heart_t.goto(self.pts[0][0] * k, self.pts[0][1] * k)
            self.heart_t.pendown()
            for (x, y) in self.pts:
                self.heart_t.goto(x * k, y * k)

            # core outline
            self.heart_t.width(3)
            self.heart_t.color((1, 0.16 + 0.04 * math.sin(time.time()), 0.45))
            self.heart_t.penup()
            self.heart_t.goto(self.pts[0][0] * k, self.pts[0][1] * k)
            self.heart_t.pendown()
            for (x, y) in self.pts:
                self.heart_t.goto(x * k, y * k)

            # small background animation step
            self.animate_background()
            self.screen.update()
            time.sleep(0.05)

    def run(self):
        # draw faint watermark first (behind everything)
        self.draw_watermark()
        # create stars and particles
        self.make_stars_and_particles()
        # initial slow rotate movement (turtle pen rotates before tracing)
        rot_t = turtle.Turtle(visible=False)
        rot_t.penup()
        rot_t.goto(0, 0)
        rot_t.showturtle()
        rot_t.shape('circle')
        rot_t.color((1, 0.6, 0.9))
        for a in range(0, 90, 3):
            rot_t.setheading(a)
            rot_t.shapesize(0.5 + 0.5 * math.sin(math.radians(a*2)))
            self.animate_background()
            self.screen.update()
            time.sleep(0.02)
        rot_t.hideturtle()

        # trace outline slowly
        self.trace_heart_outline()

        # no fill (outline-only design)

        # write date above heart with subtle animation
        self.write_date()

        # name typing animation inside
        self.write_name_typing()

        # message below
        self.write_message()

        # heartbeat pulse loop
        self.heartbeat_pulse()

        # keep animating background and gentle glow
        try:
            while True:
                self.animate_background()
                # fade the outline gently
                self.heart_t.color((1, 0.18 + 0.04 * math.sin(time.time()), 0.45))
                self.screen.update()
                time.sleep(0.04)
        except turtle.Terminator:
            pass


if __name__ == '__main__':
    anim = NeonHeartAnimation()
    anim.run()
