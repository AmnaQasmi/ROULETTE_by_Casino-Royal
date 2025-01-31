"use client";
import Header from "../../Components/Header";
// import './styles.css';
const About = () => {
  return (
    <>
      <Header />
      <div
        style={{
          fontFamily: "Kings, serif",
          padding: "20px",
          lineHeight: "1.8",
          color: "#6A3502",
          backgroundColor: "#F7F3E9",
        }}
      >
        {/* Rules Section */}
        <div
          style={{
            maxWidth: "800px",
            margin: "50px auto",
            padding: "20px",
            backgroundColor: "#FFF",
            borderRadius: "8px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1
            style={{ fontSize: "35px", fontWeight: "bold", textAlign: "center" }}
          >
            Roulette Rules
          </h1>

          <p style={{ fontSize: "20px", marginTop: "20px" }}>
            1. <b>Objective of the Game:</b> Players place bets on where the ball will land on the spinning wheel. The goal is to predict the winning number, color, or section.
          </p>

          <p style={{ fontSize: "20px", marginTop: "15px" }}>
            2. <b>Types of Bets:</b>
          </p>
          <div style={{ marginLeft: "20px", fontSize: "20px", marginBottom: "15px" }}>
            <ul>
              <li><b>Inside Bets:</b> Straight Up, Split, Street, Corner, Line.</li>
              <li><b>Outside Bets:</b> Red/Black, Odd/Even, High/Low, Columns, Dozens.</li>
            </ul>
          </div>


          <p style={{ fontSize: "20px", marginTop: "15px" }}>
            3. <b>Payouts:</b> Each bet type has different payout ratios, e.g., Straight Up pays 35:1, Red/Black pays 1:1.
          </p>

          <p style={{ fontSize: "20px", marginTop: "15px" }}>
            4. <b>The Wheel:</b> European roulette has 37 numbered pockets, while American roulette has 38 (extra 00).
          </p>

          <p style={{ fontSize: "20px", marginTop: "15px" }}>
            5. <b>Gameplay:</b> Players place bets, the dealer spins the wheel, and the ball lands in a pocket to determine the winner.
          </p>

          <p style={{ fontSize: "20px", marginTop: "15px" }}>
            6. <b>House Edge:</b> European Roulette has a house edge of 2.7%, while American Roulette has a house edge of 5.26%.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
