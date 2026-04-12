import turtle
import time
import random

# Set up the screen
screen = turtle.Screen()
screen.bgcolor("#f8f8f8")
screen.title("Ayesha & Ahmed - Wedding Card")
screen.setup(width=800, height=600)

# Create turtles
pen = turtle.Turtle()
pen.speed(0)
pen.hideturtle()

envelope = turtle.Turtle()
envelope.speed(0)
envelope.hideturtle()

text_turtle = turtle.Turtle()
text_turtle.speed(0)
text_turtle.hideturtle()

# Function to draw envelope
def draw_envelope():
    envelope.penup()
    envelope.goto(-150, -100)
    envelope.pendown()
    envelope.color("#d4af37")
    envelope.pensize(3)

    # Draw envelope body
    envelope.forward(300)
    envelope.left(90)
    envelope.forward(200)
    envelope.left(90)
    envelope.forward(300)
    envelope.left(90)
    envelope.forward(200)
    envelope.left(90)

    # Draw flap
    envelope.penup()
    envelope.goto(-150, 100)
    envelope.pendown()
    envelope.goto(0, 150)
    envelope.goto(150, 100)

# Function to animate envelope opening
def open_envelope():
    # Animate flap opening
    flap_points = []
    for i in range(21):
        x = -150 + i * 15
        y = 100 + (i - 10) ** 2 * 0.5
        flap_points.append((x, y))

    envelope.penup()
    envelope.goto(-150, 100)
    envelope.pendown()
    envelope.color("#cfa6a6")

    for point in flap_points:
        envelope.goto(point[0], point[1])
        time.sleep(0.05)

    envelope.goto(150, 100)

# Function to draw hearts
def draw_heart(x, y, size, color):
    heart_turtle = turtle.Turtle()
    heart_turtle.speed(0)
    heart_turtle.hideturtle()
    heart_turtle.penup()
    heart_turtle.goto(x, y)
    heart_turtle.pendown()
    heart_turtle.color(color)
    heart_turtle.begin_fill()
    heart_turtle.left(140)
    heart_turtle.forward(size)
    heart_turtle.circle(-size/2, 200)
    heart_turtle.left(120)
    heart_turtle.circle(-size/2, 200)
    heart_turtle.forward(size)
    heart_turtle.end_fill()
    heart_turtle.setheading(0)

# Function to draw flowers
def draw_flower(x, y, size, color):
    flower_turtle = turtle.Turtle()
    flower_turtle.speed(0)
    flower_turtle.hideturtle()
    flower_turtle.penup()
    flower_turtle.goto(x, y)
    flower_turtle.pendown()
    flower_turtle.color(color)

    for _ in range(6):
        flower_turtle.forward(size)
        flower_turtle.right(60)
        flower_turtle.forward(size)
        flower_turtle.right(120)
        flower_turtle.forward(size)
        flower_turtle.right(60)

    flower_turtle.penup()
    flower_turtle.goto(x, y + size/2)
    flower_turtle.pendown()
    flower_turtle.dot(size/4, "#d4af37")

# Function to animate text
def animate_text(text, x, y, font_size, color):
    text_turtle.penup()
    text_turtle.goto(x, y)
    text_turtle.color(color)

    for char in text:
        text_turtle.write(char, font=("Arial", font_size, "normal"))
        time.sleep(0.1)
        text_turtle.forward(15)

# Function to create confetti effect
def confetti():
    colors = ["#d4af37", "#cfa6a6", "#e8dccf", "#ffffff", "#f0f0f0"]
    for _ in range(30):
        confetti_piece = turtle.Turtle()
        confetti_piece.speed(0)
        confetti_piece.hideturtle()
        confetti_piece.shape("circle")
        confetti_piece.shapesize(0.3)
        confetti_piece.color(random.choice(colors))
        confetti_piece.penup()
        confetti_piece.goto(random.randint(-400, 400), random.randint(-300, 300))
        confetti_piece.showturtle()

        # Animate falling
        for _ in range(20):
            confetti_piece.sety(confetti_piece.ycor() - 10)
            confetti_piece.setx(confetti_piece.xcor() + random.randint(-5, 5))
            time.sleep(0.01)

        confetti_piece.hideturtle()

# Main animation sequence
def main():
    # Draw envelope
    draw_envelope()

    # Click to open message
    pen.penup()
    pen.goto(0, -200)
    pen.color("#2b2b2b")
    pen.write("Click anywhere to open the wedding card!", align="center", font=("Arial", 16, "normal"))

    def on_click(x, y):
        # Clear click message
        pen.clear()

        # Open envelope
        open_envelope()

        # Clear envelope and draw wedding card
        envelope.clear()
        screen.bgcolor("#ffffff")

        # Draw decorative elements
        for i in range(8):
            draw_heart(random.randint(-350, 350), random.randint(-250, 250), random.randint(10, 20), "#cfa6a6")
            draw_flower(random.randint(-350, 350), random.randint(-250, 250), random.randint(15, 25), "#d4af37")

        # Animate couple names
        animate_text("Ayesha & Ahmed", -200, 150, 36, "#d4af37")

        # Wedding message
        text_turtle.penup()
        text_turtle.goto(0, 100)
        text_turtle.color("#cfa6a6")
        text_turtle.write("Together Forever", align="center", font=("Arial", 24, "normal"))

        # Events
        text_turtle.penup()
        text_turtle.goto(0, 50)
        text_turtle.color("#2b2b2b")
        text_turtle.write("Wedding Events", align="center", font=("Arial", 18, "bold"))

        events = [
            "Mehndi: May 28, 2026 - 6:00 PM",
            "Barat: May 31, 2026 - 7:00 PM",
            "Walima: June 1, 2026 - 8:00 PM"
        ]

        for i, event in enumerate(events):
            text_turtle.penup()
            text_turtle.goto(0, 20 - i * 30)
            text_turtle.color("#d4af37")
            text_turtle.write(event, align="center", font=("Arial", 14, "normal"))

        # Venue
        text_turtle.penup()
        text_turtle.goto(0, -100)
        text_turtle.color("#2b2b2b")
        text_turtle.write("Grand Ballroom, City Hotel", align="center", font=("Arial", 16, "normal"))

        # Blessing message
        text_turtle.penup()
        text_turtle.goto(0, -150)
        text_turtle.color("#cfa6a6")
        text_turtle.write("With the blessings of Allah and our families,", align="center", font=("Arial", 16, "normal"))

        text_turtle.penup()
        text_turtle.goto(0, -180)
        text_turtle.write("we invite you to celebrate our special day!", align="center", font=("Arial", 16, "normal"))

        # Confetti celebration
        confetti()

        # Final message
        time.sleep(2)
        text_turtle.penup()
        text_turtle.goto(0, -250)
        text_turtle.color("#d4af37")
        text_turtle.write("Love, Laughter & Happily Ever After", align="center", font=("Arial", 20, "normal"))

    screen.onscreenclick(on_click)

    turtle.done()

if __name__ == "__main__":
    main()