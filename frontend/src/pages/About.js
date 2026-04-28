import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Play, Sofa, Palette, Lightbulb } from 'lucide-react';

//images
import Couple from '../assets/couple.png';
import Living_room from '../assets/living_room.png';


/* ─── couleurs du site ───────────────────────────────────────────
   primary   : #163a4a  (bleu-vert profond)
   accent    : #eab308  (jaune doré)
   warm      : #f87171  (terracotta doux)
   light-bg  : #f4f6f8
   card-warm : #fdf1e4
   text-dark : #1a2e38
   text-light: #6b8290
──────────────────────────────────────────────────────────────────*/

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  .about-page * { box-sizing: border-box; margin: 0; padding: 0; }
  .about-page { font-family: 'DM Sans', sans-serif; color: #1a2e38; }

  /* ─── hero banner ─── */
  .ab-hero {
    background: #163a4a;
    padding: 90px 20px 70px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .ab-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 70% 50%, rgba(234,179,8,.08) 0%, transparent 60%),
                radial-gradient(ellipse at 20% 80%, rgba(248,113,113,.06) 0%, transparent 50%);
  }
  .ab-hero-breadcrumb {
    font-size: 13px; color: rgba(255,255,255,.5);
    letter-spacing: .05em; margin-bottom: 18px;
    position: relative;
  }
  .ab-hero-breadcrumb span { color: rgba(255,255,255,.85); }
  .ab-hero h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(40px, 6vw, 72px);
    font-weight: 700; color: #fff; line-height: 1.1;
    position: relative;
  }

  /* ─── sections communes ─── */
  .ab-section {
    max-width: 1140px; margin: 0 auto;
    padding: 90px 24px;
  }
  .ab-section-alt {
    background: #f0f3f5;
    padding: 90px 24px;
  }
  .ab-section-alt .ab-inner {
    max-width: 1140px; margin: 0 auto;
  }
  .ab-tag {
    display: inline-block;
    background: rgba(22,58,74,.08);
    color: #163a4a;
    font-size: 11px; font-weight: 500;
    letter-spacing: .12em; text-transform: uppercase;
    padding: 6px 14px; border-radius: 30px;
    margin-bottom: 20px;
  }
  .ab-tag-accent { background: rgba(234,179,8,.15); color: #92700a; }

  /* ─── section 1 : histoire + vidéo ─── */
  .ab-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px; align-items: center;
  }
  .ab-row-reverse { direction: rtl; }
  .ab-row-reverse > * { direction: ltr; }
  .ab-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 3.5vw, 42px);
    font-weight: 700; line-height: 1.2;
    color: #1a2e38; margin-bottom: 18px;
  }
  .ab-body {
    font-size: 15px; line-height: 1.8;
    color: #6b8290; margin-bottom: 28px;
  }
  .ab-btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    background: #163a4a; color: #fff;
    padding: 13px 26px; border-radius: 30px;
    font-size: 14px; font-weight: 500;
    text-decoration: none; border: none; cursor: pointer;
    transition: background .2s, transform .15s;
  }
  .ab-btn-primary:hover { background: #0f2a36; transform: translateY(-1px); }

  /* ─── image section 1 ─── */
  .ab-img-wrap {
    position: relative; border-radius: 20px; overflow: visible;
    aspect-ratio: 4/3;
  }
  .ab-img-wrap img {
    width: 100%; height: 100%; object-fit: cover;
    display: block; border-radius: 20px;
  }
  .ab-img-deco {
    position: absolute; top: -16px; right: -16px;
    width: 100px; height: 100px;
    border: 2px solid rgba(234,179,8,.4); border-radius: 50%;
    pointer-events: none;
  }
  .ab-img-deco2 {
    position: absolute; bottom: 20px; left: -20px;
    width: 64px; height: 64px;
    background: #eab308; border-radius: 50%; opacity: .15;
    pointer-events: none;
  }

  /* ─── section 2 : valeurs ─── */
  .ab-values-head {
    text-align: center; margin-bottom: 50px;
  }
  .ab-cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .ab-val-card {
    background: #fff;
    border-radius: 20px;
    padding: 36px 28px;
    border: 1px solid rgba(22,58,74,.07);
    transition: transform .2s, box-shadow .2s;
    cursor: default;
  }
  .ab-val-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(22,58,74,.08);
  }
  .ab-val-card.featured {
    background: #163a4a; color: #fff;
    border-color: #163a4a;
  }
  .ab-val-icon {
    width: 54px; height: 54px; border-radius: 50%;
    background: rgba(22,58,74,.07);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 22px;
  }
  .ab-val-card.featured .ab-val-icon { background: rgba(255,255,255,.12); }
  .ab-val-card h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px; font-weight: 600;
    margin-bottom: 12px;
  }
  .ab-val-card p { font-size: 14px; line-height: 1.7; color: #6b8290; }
  .ab-val-card.featured p { color: rgba(255,255,255,.65); }
  .ab-read-more {
    display: inline-flex; align-items: center; gap: 6px;
    margin-top: 20px; font-size: 13px; font-weight: 500;
    color: #163a4a; text-decoration: none;
    border: none; background: none; cursor: pointer; padding: 0;
  }
  .ab-val-card.featured .ab-read-more { color: #eab308; }

  /* ─── section 3 : mission ─── */
  .ab-checklist {
    list-style: none; margin-bottom: 32px;
    display: flex; flex-direction: column; gap: 12px;
  }
  .ab-checklist li {
    display: flex; align-items: center; gap: 12px;
    font-size: 15px; color: #1a2e38;
  }
  .ab-author {
    display: flex; align-items: center; gap: 14px;
    padding-top: 24px;
    border-top: 1px solid rgba(22,58,74,.08);
  }
  .ab-author-avatar {
    width: 46px; height: 46px; border-radius: 50%;
    background: #eab308;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 700; color: #163a4a;
    flex-shrink: 0;
  }
  .ab-author-name { font-weight: 500; font-size: 14px; }
  .ab-author-title { font-size: 12px; color: #6b8290; margin-top: 2px; }
  .ab-quote {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(20px, 2.5vw, 30px);
    font-weight: 600; line-height: 1.4;
    color: #1a2e38; margin-bottom: 18px;
    font-style: italic;
  }
  .ab-quote::before { content: '\u201C'; color: #eab308; }
  .ab-quote::after  { content: '\u201D'; color: #eab308; }

  /* ─── section 4 : vision ─── */
  .ab-vision-img {
    border-radius: 20px; overflow: hidden;
    aspect-ratio: 4/5; position: relative;
    background: #fdf1e4;
    display: flex; align-items: center; justify-content: center;
  }
  .ab-vision-placeholder {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 16px; opacity: .35;
    color: #163a4a;
  }
  .ab-vision-deco {
    position: absolute; top: -18px; right: -18px;
    width: 120px; height: 120px;
    border: 2px solid rgba(234,179,8,.3);
    border-radius: 50%;
  }
  .ab-vision-deco2 {
    position: absolute; bottom: 24px; left: -24px;
    width: 80px; height: 80px;
    background: #eab308; border-radius: 50%; opacity: .12;
  }

  /* ─── stats band ─── */
  .ab-stats {
    background: #163a4a;
    padding: 60px 24px;
  }
  .ab-stats-inner {
    max-width: 1140px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 24px; text-align: center;
  }
  .ab-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px; font-weight: 700;
    color: #eab308; line-height: 1;
    margin-bottom: 8px;
  }
  .ab-stat-label { font-size: 14px; color: rgba(255,255,255,.6); }

  /* ─── responsive ─── */
  @media (max-width: 768px) {
    .ab-row, .ab-cards-grid, .ab-stats-inner {
      grid-template-columns: 1fr;
    }
    .ab-row-reverse { direction: ltr; }
    .ab-stat-num { font-size: 36px; }
  }
`;

export default function About() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div className="about-page">
      <style>{STYLES}</style>

      {/* ── HERO ── */}
      <section className="ab-hero">
        <p className="ab-hero-breadcrumb">Accueil &rsaquo; <span>À propos</span></p>
        <h1>À propos de nous</h1>
      </section>

      {/* ── SECTION 1 : Notre histoire + vidéo ── */}
      <section className="ab-section">
        <div className="ab-row">
          {/* texte */}
          <div>
            <span className="ab-tag">Notre histoire</span>
            <h2 className="ab-headline">
              Ce que nos clients disent de leur intérieur transformé.
            </h2>
            <p className="ab-body">
              Chez Athena, nous croyons que chaque espace mérite d'être habité avec intention. 
              Depuis notre fondation, nous accompagnons nos clients dans la création d'intérieurs 
              qui allient esthétique, confort et authenticité — des espaces qui leur ressemblent 
              vraiment.
            </p>
            <p className="ab-body" style={{ marginBottom: 32 }}>
              Notre équipe de designers passionnés sélectionne chaque pièce avec soin, 
              privilégiant des matériaux nobles, des formes intemporelles et un savoir-faire 
              artisanal qui fait la différence.
            </p>
            <a href="/shop" className="ab-btn-primary">
              Découvrir nos collections <ArrowRight size={16} />
            </a>
          </div>

          {/* image placeholder */}
          <div className="ab-img-wrap">
            <img src={Couple} alt="Notre univers" />
            <div className="ab-img-deco" />
            <div className="ab-img-deco2" />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="ab-stats">
        <div className="ab-stats-inner">
          {[
            { num: '2 500+', label: 'Styles uniques' },
            { num: '5 000+', label: 'Clients satisfaits' },
            { num: '300+',   label: 'Boutiques certifiées' },
            { num: '12 ans', label: "D'expérience" },
          ].map(s => (
            <div key={s.label}>
              <div className="ab-stat-num">{s.num}</div>
              <div className="ab-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 2 : Nos valeurs ── */}
      <section className="ab-section-alt">
        <div className="ab-inner">
          <div className="ab-values-head">
            <span className="ab-tag">Nos valeurs</span>
            <h2 className="ab-headline" style={{ maxWidth: 540, margin: '0 auto' }}>
              Les principes qui guident chacun de nos choix.
            </h2>
          </div>

          <div className="ab-cards-grid">
            {[
              {
                icon: <Palette size={22} color="#163a4a" />,
                title: 'Design intemporel',
                desc: 'Nous croyons en la beauté durable. Chaque meuble est pensé pour traverser les tendances et embellir votre quotidien pendant des années.',
                featured: false,
              },
              {
                icon: <Sofa size={22} color="#fff" />,
                title: 'Confort avant tout',
                desc: 'Un beau meuble doit aussi être agréable à vivre. Nos collections marient esthétique et ergonomie pour un bien-être au quotidien.',
                featured: true,
              },
              {
                icon: <Lightbulb size={22} color="#163a4a" />,
                title: 'Conseil personnalisé',
                desc: 'Chaque intérieur est unique. Notre équipe vous accompagne pour créer un espace qui reflète votre personnalité et vos besoins.',
                featured: false,
              },
            ].map(card => (
              <div key={card.title} className={`ab-val-card${card.featured ? ' featured' : ''}`}>
                <div className="ab-val-icon">
                  {card.icon}
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <button className="ab-read-more">
                  En savoir plus <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 : Notre mission ── */}
      <section className="ab-section">
        <div className="ab-row">
          {/* texte gauche */}
          <div>
            <span className="ab-tag ab-tag-accent">Notre mission</span>
            <h2 className="ab-headline">
              Créer des intérieurs qui racontent votre histoire.
            </h2>
            <p className="ab-body">
              Chez Athena, nous ne vendons pas simplement des meubles — nous vous aidons 
              à composer des espaces de vie qui vous ressemblent. Notre approche combine 
              expertise en design, écoute attentive et sélection rigoureuse.
            </p>
            <ul className="ab-checklist">
              {[
                'Comprendre votre style et vos besoins',
                'Proposer des solutions créatives et adaptées',
                'Garantir des matériaux de qualité durable',
              ].map(item => (
                <li key={item}>
                  <CheckCircle2 size={18} color="#163a4a" style={{ flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
            <a href="/shop" className="ab-btn-primary">
              Rejoindre l'aventure <ArrowRight size={16} />
            </a>
          </div>

          {/* citation + auteur */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
            <p className="ab-quote">
              Comment transformer votre intérieur en un vrai havre de paix, avec notre expertise.
            </p>
            <ul className="ab-checklist">
              {[
                'Nous voulons vous comprendre.',
                'Des idées inspirantes et créatives.',
                'Un accompagnement de A à Z.',
              ].map(item => (
                <li key={item}>
                  <CheckCircle2 size={18} color="#eab308" style={{ flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="ab-author">
              <div className="ab-author-avatar">S</div>
              <div>
                <div className="ab-author-name">Sophie Moreau</div>
                <div className="ab-author-title">Fondatrice, Athena Design</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 : Notre vision ── */}
      <section className="ab-section-alt">
        <div className="ab-inner">
          <div className="ab-row ab-row-reverse">
            {/* image placeholder */}
            <div style={{ position: 'relative' }}>
              <div className="ab-vision-img">
                <div className="ab-vision-placeholder">
                  <Sofa size={64} />
                  <span style={{ fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>
                    <img src={Living_room} alt="Table" style={styles.catImage} />
                  </span>
                </div>
              </div>
              <div className="ab-vision-deco" />
              <div className="ab-vision-deco2" />
            </div>

            {/* texte */}
            <div>
              <span className="ab-tag">Notre vision</span>
              <h2 className="ab-headline">
                Un intérieur bien pensé change la qualité de vie.
              </h2>
              <p className="ab-body">
                Nous imaginons un monde où chaque foyer est un espace de sérénité, 
                de créativité et d'authenticité. Athena travaille chaque jour pour 
                rendre le design d'intérieur accessible à tous, sans compromis sur 
                la qualité ni sur le style.
              </p>
              <ul className="ab-checklist" style={{ marginBottom: 32 }}>
                {[
                  'Rendre le beau design accessible.',
                  'Inspirer à travers des espaces uniques.',
                  'Garantir durabilité et responsabilité.',
                ].map(item => (
                  <li key={item}>
                    <CheckCircle2 size={18} color="#163a4a" style={{ flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="/shop" className="ab-btn-primary">
                Découvrir nos collections <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}