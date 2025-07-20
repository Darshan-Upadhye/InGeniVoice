'use client';

import { useState } from 'react';
import InGeniVoice from './InGeniVoice';
import styles from './InGeniVoiceWelcome.module.css';

export default function InGeniVoiceWelcome() {
  const [showVoiceBot, setShowVoiceBot] = useState(false);

  return (
    <div className={styles.fullPage}>
      {!showVoiceBot ? (
        <div className={styles.welcomeContainer}>
          <img src="/InGeniVoice Logo.svg" alt="InGeniVoice Logo" className={styles.logo} />
          <h1 className={styles.title}>Welcome to InGeniVoice</h1>

          <div className={styles.description}>
            <p><strong>🤖 What It Does</strong><br />
              InGeniVoice is a voice-enabled AI assistant that helps you interact using speech and text. Built for productivity and curiosity.
            </p>

            <p><strong>👨‍💻 Who Made It</strong><br />
              Created by <strong>Darshan Akshay Upadhye</strong>, a passionate full-stack developer and generative AI enthusiast.
            </p>

            <div className={styles.socialLinks}>
              <a
                href="https://github.com/Darshan-Upadhye"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <img src="/github.svg" alt="GitHub" className={styles.icon} /> GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/darshan-upadhye-02a9a5287?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bb%2FVR2H1QQauLs78yeoX15A%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <img src="/linkedin.svg" alt="LinkedIn" className={styles.icon} /> LinkedIn
              </a>

              <a
                href="https://ingenibot.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <img src="/ingenibot.svg" alt="InGeniBot" className={styles.iconIngenibot} /> Try InGeniBot
              </a>
            </div>

            <p><strong>🔧 How It Was Built</strong><br />
              - Frontend: <em>Next.js + React + Web Speech API (voice input & TTS)</em><br />
              - Backend: <em>OpenRouter API (Mistral 7B), with real-time voice chat UI and avatars</em><br />
              - Design: Minimal voice-first UI with animated mic input and clean chat bubbles.
Styled using Azure, Purple, and Blue on a bright white backdrop.
            </p>

            <p><strong>🎯 Why It Was Made</strong><br />
              To bring voice-based interactions to life using free and open technologies.
            </p>
          </div>

          <button className={styles.tryButton} onClick={() => setShowVoiceBot(true)}>
            🎙️ Try InGeniVoice
          </button>
        </div>
      ) : (
        <div className={styles.popupContainer}>
  <InGeniVoice onClose={() => setShowVoiceBot(false)} />
</div>
      )}
    </div>
  );
}
