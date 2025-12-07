import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Feather } from 'lucide-react';

// --- DATA SOURCE ---
// Content structured for easy toggling between Latin and Aksara
const contentData = {
  header: {
    title: {
      latin: "Warisan Budaya Jawa",
      aksara: "ꦮꦫꦶꦱꦤ꧀ꦧꦸꦣꦪꦗꦮ"
    },
    subtitle: {
      latin: "Seni Tari saka Jawa Tengah, Jawa Timur, lan Yogyakarta",
      aksara: "ꦱꦼꦤꦶꦠꦫꦶꦱꦏꦗꦮꦠꦼꦔꦃ꧈ꦗꦮꦠꦶꦩꦸꦂ꧈ꦭꦤ꧀ꦪꦺꦴꦒꦾꦏꦂꦠ"
    }
  },
  sections: [
    {
      id: "jateng",
      title: {
        latin: "1. Tarian Khas Jawa Tengah",
        aksara: "꧇꧑꧇꧉ꦠꦫꦶꦪꦤ꧀ꦏ꦳ꦱ꧀ꦗꦮꦠꦼꦔꦃ"
      },
      intro: {
        latin: "Jawa Tengah misuwur minangka tlatah ingkang sugih kabudayan alus, tata krama, lan filosofi Jawi. Saben tarian ing Jawa Tengah asring nggambaraken kaanggunan, kelembutan, lan nilai-nilai luhur pakulinan masyarakat. Ing ngandhap punika penjelasan rinci:",
        aksara: "꧋ꦗꦮꦠꦼꦔꦃꦩꦶꦱꦸꦮꦸꦂꦩꦶꦤꦁꦏꦠ꧀ꦭꦠꦃꦆꦁꦏꦁꦱꦸꦒꦶꦃꦏꦧꦸꦢꦪꦤ꧀ꦄꦭꦸꦱ꧀‌ꦠꦠꦏꦿꦩ꧈ꦭꦤ꧀ꦥ꦳ꦶꦭꦺꦴꦱꦺꦴꦥ꦳ꦶꦗꦮꦶ꧉ꦱꦧꦼꦤ꧀ꦠꦫꦶꦪꦤ꧀ꦆꦁꦗꦮꦠꦼꦔꦃꦄꦱꦿꦶꦁꦔ꧀ꦒꦩ꧀ꦧꦫꦏꦺꦤ꧀ꦏꦄꦁꦒꦸꦤꦤ꧀‌ꦏꦼꦊꦩ꧀ꦧꦸꦠꦤ꧀‌ꦭꦤ꧀ꦤꦶꦭꦻꦤꦶꦭꦻꦭꦸꦲꦸꦂꦥꦏꦸꦭꦶꦤꦤ꧀ꦩꦱꦾꦫꦏꦠ꧀꧈ꦆꦁꦔꦤ꧀ꦝꦥ꧀ꦥꦸꦤꦶꦏꦥꦼꦚ꧀ꦗꦼꦭꦱꦤ꧀ꦫꦶꦚ꧀ꦕꦶ꧇"
      },
      dances: [
        {
          name: { latin: "1. Tari Gambyong", aksara: "꧇꧑꧇꧉ꦠꦫꦶꦒꦩ꧀ꦧꦾꦺꦴꦁ" },
          image: "",
          desc: {
            latin: "Tari Gambyong punika tarian tradisional saged dipunmanggihaken ing Surakarta lan sakbrayatipun. Asalipun saking seni tayub rakyat, nanging salajengipun dipunmodifikasi déning Keraton Surakarta dados tarian klasik. Gerak tarinya menekaken keluwesan awak, gerakan tangan, lan ekspresi pasuryan ingkang sumringah. Tarian punika nggambaraken rasa bungah lan puji syukur.",
            aksara: "꧋ꦠꦫꦶꦒꦩ꧀ꦧꦾꦺꦴꦁꦥꦸꦤꦶꦏꦠꦫꦶꦪꦤ꧀ꦠꦿꦣꦶꦱꦶꦪꦺꦴꦤꦭ꧀ꦱꦒꦺꦣ꧀ꦝꦶꦥꦸꦤ꧀ꦩꦁꦒꦶꦲꦏꦺꦤ꧀ꦆꦁꦱꦸꦫꦏꦂꦠꦭꦤ꧀ꦱꦏ꧀ꦧꦿꦪꦠꦶꦥꦸꦤ꧀꧈ꦄꦱꦭꦶꦥꦸꦤ꧀ꦱꦏꦶꦁꦱꦼꦤꦶꦠꦪꦸꦧ꧀ꦫꦏꦾꦠ꧀‌ꦤꦔꦶꦁꦱꦭꦗꦺꦔꦶꦥꦸꦤ꧀ꦝꦶꦥꦸꦤ꧀ꦩꦺꦴꦣꦶꦥ꦳ꦶꦏꦱꦶꦣꦺꦤꦶꦁꦏꦼꦫꦠꦺꦴꦤ꧀ꦱꦸꦫꦏꦂꦠꦣꦝꦺꦴꦱ꧀ꦠꦫꦶꦪꦤ꧀ꦏ꧀ꦭꦱꦶꦏ꧀꧈ꦒꦼꦫꦏ꧀ꦠꦫꦶꦚꦩꦼꦤꦼꦏꦏꦺꦤ꧀ꦏꦼꦭꦸꦮꦼꦱꦤ꧀ꦄꦮꦏ꧀‌ꦒꦼꦫꦏꦤ꧀ꦠꦔꦤ꧀‌ꦭꦤ꧀ꦌꦏ꧀ꦱ꧀ꦥꦿꦺꦱꦶꦥꦱꦸꦂꦪꦤ꧀ꦆꦁꦏꦁꦱꦸꦩꦿꦶꦔꦃ꧉ꦠꦫꦶꦪꦤ꧀ꦥꦸꦤꦶꦏꦔ꧀ꦒꦩ꧀ꦧꦫꦏꦺꦤ꧀ꦫꦱꦧꦸꦔꦃꦭꦤ꧀ꦥꦸꦗꦶꦱꦾꦸꦏꦸꦂ꧉"
          },
          meanings: [
            { latin: "Keluwesan lan keayuan wanita Jawa.", aksara: "꧋•ꦏꦼꦭꦸꦮꦼꦱꦤ꧀ꦭꦤ꧀ꦏꦼꦄꦪꦸꦮꦤ꧀ꦮꦤꦶꦠꦗꦮ꧉" },
            { latin: "Simbol wujud rasa hormat dhumateng tamu.", aksara: "꧋•ꦱꦶꦩ꧀ꦧꦺꦴꦭ꧀ꦮꦸꦗꦸꦣ꧀ꦫꦱꦲꦺꦴꦂꦩꦠ꧀ꦝꦸꦩꦠꦺꦁꦠꦩꦸ꧉" }
          ]
        },
        {
          name: { latin: "2. Tari Bondan (Bondan Payung)", aksara: "꧇꧒꧇꧉ꦠꦫꦶꦧꦺꦴꦤ꧀ꦝꦤ꧀(ꦧꦺꦴꦤ꧀ꦝꦤ꧀ꦥꦪꦸꦁ)" },
          image: "",
          desc: {
            latin: "Tari Bondan saking Surakarta asring dipunbawakake déning penari putri ingkang nggambaraken katresnanipun ibu marang anak. Penari nyekel boneka bayi lan payung minangka simbol perlindungan. Ing sawetara adegan, penari lumampah ing kendi pecah minangka simbol ketahanan lan ketelitian.",
            aksara: "꧋ꦠꦫꦶꦧꦺꦴꦤ꧀ꦝꦤ꧀ꦱꦏꦶꦁꦱꦸꦫꦏꦂꦠꦄꦱꦿꦶꦁꦣꦶꦥꦸꦤ꧀ꦧꦮꦏꦏꦺꦣꦺꦤꦶꦁꦥꦼꦤꦫꦶꦥꦸꦠꦿꦶꦆꦁꦏꦁꦔ꧀ꦒꦩ꧀ꦧꦫꦏꦺꦤ꧀ꦏꦠꦿꦺꦱ꧀ꦤꦤꦶꦥꦸꦤ꧀ꦆꦧꦸꦩꦫꦁꦄꦤꦏ꧀꧈ꦥꦼꦤꦫꦶꦚꦼꦏꦼꦭ꧀ꦧꦺꦴꦤꦺꦏꦧꦪꦶꦭꦤ꧀ꦥꦪꦸꦁꦩꦶꦤꦁꦏꦱꦶꦩ꧀ꦧꦺꦴꦭ꧀ꦥꦼꦂꦭꦶꦤ꧀ꦝꦸꦔꦤ꧀꧈ꦆꦁꦱꦮꦺꦠꦫꦄꦣꦼꦒꦤ꧀‌ꦥꦼꦤꦫꦶꦭꦸꦩꦩ꧀ꦥꦃꦆꦁꦏꦼꦤ꧀ꦝꦶꦥꦼꦕꦃꦩꦶꦤꦁꦏꦱꦶꦩ꧀ꦧꦺꦴꦭ꧀ꦏꦼꦠꦲꦤꦤ꧀ꦭꦤ꧀ꦏꦼꦠꦼꦭꦶꦠꦶꦪꦤ꧀꧈"
          },
          meanings: [
            { latin: "Rasa sayang ibu lan tanggung jawab.", aksara: "•ꦫꦱꦱꦪꦁꦆꦧꦸꦭꦤ꧀ꦠꦁꦒꦸꦁꦗꦮꦧ꧀꧈" },
            { latin: "Simbol kerapuhan nanging ugi kekuwatan batin wanita.", aksara: "꧋•ꦱꦶꦩ꧀ꦧꦺꦴꦭ꧀ꦏꦼꦫꦥꦸꦲꦤ꧀ꦤꦔꦶꦁꦈꦒꦶꦏꦼꦏꦸꦮꦠꦤ꧀ꦧꦠꦶꦤ꧀ꦮꦤꦶꦠ꧉" }
          ]
        },
        {
          name: { latin: "3. Tari Serimpi", aksara: "꧇꧓꧇꧉ꦠꦫꦶꦱꦼꦫꦶꦩ꧀ꦥꦶ" },
          image: "",
          desc: {
            latin: "Serimpi punika tarian keraton Jawa Tengah ingkang alus sanget. Dipunbawakake déning sekawan putri kanthi gerakan simetris, alon, lan harmonis. Serimpi dipunanggep minangka tarian suci ing kraton.",
            aksara: "꧋ꦱꦼꦫꦶꦩ꧀ꦥꦶꦥꦸꦤꦶꦏꦠꦫꦶꦪꦤ꧀ꦏꦼꦫꦠꦺꦴꦤ꧀ꦗꦮꦠꦼꦔꦃꦆꦁꦏꦁꦄꦭꦸꦱ꧀ꦱꦔꦺꦠ꧀꧈ꦣꦶꦥꦸꦤ꧀ꦧꦮꦏꦏꦺꦣꦺꦤꦶꦁꦱꦼꦏꦮꦤ꧀ꦥꦸꦠꦿꦶꦏꦤ꧀ꦛꦶꦒꦼꦫꦏꦤ꧀ꦱꦶꦩꦺꦠꦿꦶꦱ꧀‌ꦄꦭꦺꦴꦤ꧀‌ꦭꦤ꧀ꦲꦂꦩꦺꦴꦤꦶꦱ꧀꧈ꦱꦼꦫꦶꦩ꧀ꦥꦶꦣꦶꦥꦸꦤꦁꦒꦺꦥ꧀ꦩꦶꦤꦁꦏꦠꦫꦶꦪꦤ꧀ꦱꦸꦕꦶꦆꦁꦏꦿꦠꦺꦴꦤ꧀꧈"
          },
          meanings: [
            { latin: "Kasucèn lan ketertiban kosmos.", aksara: "꧋•ꦏꦱꦸꦕꦺꦤ꧀ꦭꦤ꧀ꦏꦼꦠꦼꦂꦠꦶꦧꦤ꧀ꦏꦺꦴꦱ꧀ꦩꦺꦴꦱ꧀꧈" },
            { latin: "Simbol keselarasan antara manah lan raga.", aksara: "꧋•ꦱꦶꦩ꧀ꦧꦺꦴꦭ꧀ꦏꦼꦱꦼꦭꦫꦱꦤ꧀ꦄꦤ꧀ꦠꦫꦩꦤꦃꦭꦤ꧀ꦫꦒ꧉" }
          ]
        },
        {
          name: { latin: "4. Tari Ebeg (Jaran Kepang Banyumas)", aksara: "꧇꧔꧇꧉ꦠꦫꦶꦄꦼꦧꦼꦒ꧀(ꦗꦫꦤ꧀ꦏꦺꦥꦁꦧꦚꦸꦩꦱ꧀)" },
          image: "",
          desc: {
            latin: "Ebeg punika tarian rakyat khas Banyumas. Penari migunakaken jaran kepang saking bambu. Irama gendhing banyumasan ingkang cecek lan rame ndadosaken suasana semangat.",
            aksara: "꧋ꦄꦼꦧꦼꦒ꧀ꦥꦸꦤꦶꦏꦠꦫꦶꦪꦤ꧀ꦫꦏꦾꦠ꧀ꦏ꦳ꦱ꧀ꦧꦚꦸꦩꦱ꧀꧈ꦥꦼꦤꦫꦶꦩꦶꦒꦸꦤꦏꦏꦺꦤ꧀ꦗꦫꦤ꧀ꦏꦺꦥꦁꦱꦏꦶꦁꦧꦩ꧀ꦧꦸ꧉ꦆꦫꦩꦒꦼꦤ꧀ꦝꦶꦁꦧꦚꦸꦩꦱꦤ꧀ꦆꦁꦏꦁꦕꦼꦕꦼꦏ꧀ꦭꦤ꧀ꦫꦩꦺꦤ꧀ꦝꦣꦺꦴꦱꦏꦺꦤ꧀ꦱꦸꦮꦱꦤꦱꦼꦩꦔꦠ꧀꧈"
          },
          meanings: [
            { latin: "Keberanian prajurit Jawa lawas.", aksara: "•ꦏꦼꦧꦼꦫꦤꦶꦪꦤ꧀ꦥꦿꦗꦸꦫꦶꦠ꧀ꦗꦮꦭꦮꦱ꧀꧈" },
            { latin: "Hubungan antarane manusia lan kekuatan spiritual.", aksara: "꧋•ꦲꦸꦧꦸꦔꦤ꧀ꦄꦤ꧀ꦠꦫꦤꦺꦩꦤꦸꦱꦶꦪꦭꦤ꧀ꦏꦼꦏꦸꦮꦠꦤ꧀ꦱ꧀ꦥꦶꦫꦶꦠꦸꦮꦭ꧀꧈" }
          ]
        },
        {
          name: { latin: "5. Tari Lengger Banyumasan", aksara: "꧇꧕꧇꧉ꦠꦫꦶꦭꦺꦁꦒꦺꦂꦧꦚꦸꦩꦱꦤ꧀" },
          image: "",
          desc: {
            latin: "Lengger dipunbawakake déning wanita enom kanthi busana khas Banyumas. Gerakanipun ceria, luwes, lan ngemot unsur hiburan rakyat.",
            aksara: "꧋ꦭꦺꦁꦒꦺꦂꦣꦶꦥꦸꦤ꧀ꦧꦮꦏꦏꦺꦣꦺꦤꦶꦁꦮꦤꦶꦠꦄꦼꦤꦺꦴꦩ꧀ꦏꦤ꧀ꦛꦶꦧꦸꦱꦤꦏ꦳ꦱ꧀ꦧꦚꦸꦩꦱ꧀꧈ꦒꦼꦫꦏꦤꦶꦥꦸꦤ꧀ꦕꦼꦫꦶꦪ꧈ꦭꦸꦮꦼꦱ꧀‌ꦭꦤ꧀ꦔꦼꦩꦺꦴꦠ꧀ꦈꦤ꧀ꦱꦸꦂꦲꦶꦧꦸꦫꦤ꧀ꦫꦏꦾꦠ꧀꧈"
          },
          meanings: [
            { latin: "Ungkapan rasa syukur masyarakat.", aksara: "•ꦈꦁꦏꦥꦤ꧀ꦫꦱꦱꦾꦸꦏꦸꦂꦩꦱꦾꦫꦏꦠ꧀꧈" },
            { latin: "Simbol kabagyan lan kerukunan.", aksara: "꧋•ꦱꦶꦩ꧀ꦧꦺꦴꦭ꧀ꦏꦧꦒꦾꦤ꧀ꦭꦤ꧀ꦏꦼꦫꦸꦏꦸꦤꦤ꧀꧈" }
          ]
        },
        {
          name: { latin: "6. Tari Dolalak (Purworejo)", aksara: "꧇꧖꧇꧉ꦠꦫꦶꦣꦺꦴꦭꦭꦏ꧀(ꦥꦸꦂꦮꦺꦴꦫꦺꦗꦺꦴ)" },
          image: "",
          desc: {
            latin: "Dolalak punika tarian saking Purworejo ingkang wiwitane dipunbawakake déning prajurit lokal. Busana penari ngemu unsur gaya prajurit Walanda.",
            aksara: "꧋ꦣꦺꦴꦭꦭꦏ꧀ꦥꦸꦤꦶꦏꦠꦫꦶꦪꦤ꧀ꦱꦏꦶꦁꦥꦸꦂꦮꦺꦴꦫꦺꦗꦺꦴꦆꦁꦏꦁꦮꦶꦮꦶꦠꦤꦺꦣꦶꦥꦸꦤ꧀ꦧꦮꦏꦏꦺꦣꦺꦤꦶꦁꦥꦿꦗꦸꦫꦶꦠ꧀ꦭꦺꦴꦏꦭ꧀꧈ꦧꦸꦱꦤꦥꦼꦤꦫꦶꦔꦼꦩꦸꦈꦤ꧀ꦱꦸꦂꦒꦪꦥꦿꦗꦸꦫꦶꦠ꧀ꦮꦭꦤ꧀ꦝ꧉"
          },
          meanings: [
            { latin: "Kenangan sejarah kolonial.", aksara: "•ꦏꦼꦤꦔꦤ꧀ꦱꦼꦗꦫꦃꦏꦺꦴꦭꦺꦴꦤꦶꦪꦭ꧀꧈" },
            { latin: "Disiplin, kekuatan fisik, lan kebersamaan.", aksara: "꧋•ꦣꦶꦱꦶꦥ꧀ꦭꦶꦤ꧀‌ꦏꦼꦏꦸꦮꦠꦤ꧀ꦥ꦳ꦶꦱꦶꦏ꧀‌ꦭꦤ꧀ꦏꦼꦧꦼꦂꦱꦩꦄꦤ꧀꧈" }
          ]
        }
      ]
    },
    {
      id: "jatim",
      title: {
        latin: "2. Tarian Khas Jawa Timur",
        aksara: "꧇꧒꧇꧉ꦠꦫꦶꦪꦤ꧀ꦏ꦳ꦱ꧀ꦗꦮꦠꦶꦩꦸꦂ"
      },
      intro: {
        latin: "Jawa Timur misuwur kanthi gaya tarian gagah, enerjik, irama cepet, lan ekspresi emosional ingkang kuat. Tarian-tarianipun ngemu unsur keberanian, kekuwatan, lan ritual masyarakat.",
        aksara: "꧋ꦗꦮꦠꦶꦩꦸꦂꦩꦶꦱꦸꦮꦸꦂꦏꦤ꧀ꦛꦶꦒꦪꦠꦫꦶꦪꦤ꧀ꦒꦒꦃ꧈ꦄꦼꦤꦼꦂꦗꦶꦏ꧀‌ꦆꦫꦩꦕꦼꦥꦼꦠ꧀‌ꦭꦤ꧀ꦌꦏ꧀ꦱ꧀ꦥꦿꦺꦱꦶꦌꦩꦺꦴꦱꦶꦪꦺꦴꦤꦭ꧀ꦆꦁꦏꦁꦏꦸꦮꦠ꧀꧈ꦠꦫꦶꦪꦤ꧀ꦠꦫꦶꦪꦤꦶꦥꦸꦤ꧀ꦔꦼꦩꦸꦈꦤ꧀ꦱꦸꦂꦏꦼꦧꦼꦫꦤꦶꦪꦤ꧀‌ꦏꦼꦏꦸꦮꦠꦤ꧀‌ꦭꦤ꧀ꦫꦶꦠꦸꦮꦭ꧀ꦩꦱꦾꦫꦏꦠ꧀꧈"
      },
      dances: [
        {
          name: { latin: "1. Tari Reog Ponorogo", aksara: "꧇꧑꧇꧉ꦠꦫꦶꦫꦺꦪꦺꦴꦒ꧀ꦥꦺꦴꦤꦺꦴꦫꦺꦴꦒꦺꦴ" },
          image: "",
          desc: {
            latin: "Reog minangka seni pertunjukan paling misuwur saking Ponorogo. Topeng Dadak Merak gadhah bobot ngantos 50 kg nanging saged dipanggul déning penari namung nganggo gigipun. Penari liyanipun kados Warok lan Jathil nyengkuyung suasana magis.",
            aksara: "꧋ꦫꦺꦪꦺꦴꦒ꧀ꦩꦶꦤꦁꦏꦱꦼꦤꦶꦥꦼꦂꦠꦸꦚ꧀ꦗꦸꦏꦤ꧀ꦥꦭꦶꦁꦩꦶꦱꦸꦮꦸꦂꦱꦏꦶꦁꦥꦺꦴꦤꦺꦴꦫꦺꦴꦒꦺꦴ꧉ꦠꦺꦴꦥꦺꦁꦣꦝꦏ꧀ꦩꦼꦫꦏ꧀ꦒꦣꦃꦧꦺꦴꦧꦺꦴꦠ꧀ꦔꦤ꧀ꦠꦺꦴꦱ꧀꧇꧕꧐꧇ꦏ꧀ꦒ꧀ꦤꦔꦶꦁꦱꦒꦺꦣ꧀ꦝꦶꦥꦁꦒꦸꦭ꧀ꦝꦺꦤꦶꦁꦥꦼꦤꦫꦶꦤꦩꦸꦁꦔꦁꦒꦺꦴꦒꦶꦒꦶꦥꦸꦤ꧀꧈ꦥꦼꦤꦫꦶꦭꦶꦪꦤꦶꦥꦸꦤ꧀ꦏꦣꦺꦴꦱ꧀ꦮꦫꦺꦴꦏ꧀ꦭꦤ꧀ꦗꦛꦶꦭ꧀ꦚꦼꦁꦏꦸꦪꦸꦁꦱꦸꦮꦱꦤꦩꦒꦶꦱ꧀꧈"
          },
          meanings: [
            { latin: "Pertarungan antara kebaikan lan kejahatan.", aksara: "꧋•ꦥꦼꦂꦠꦫꦸꦔꦤ꧀ꦄꦤ꧀ꦠꦫꦏꦼꦧꦻꦏꦤ꧀ꦭꦤ꧀ꦏꦼꦗꦲꦠꦤ꧀꧈" },
            { latin: "Simbol kekuatan lahir batin lan jiwa ksatria.", aksara: "꧋•ꦱꦶꦩ꧀ꦧꦺꦴꦭ꧀ꦏꦼꦏꦸꦮꦠꦤ꧀ꦭꦲꦶꦂꦧꦠꦶꦤ꧀ꦭꦤ꧀ꦗꦶꦮꦏ꧀ꦱꦠꦿꦶꦪ꧉" }
          ]
        },
        {
          name: { latin: "2. Tari Remo", aksara: "꧇꧒꧇꧉ꦠꦫꦶꦉꦩꦺꦴ" },
          image: "",
          desc: {
            latin: "Tarian Remo asale saka Jombang lan Surabaya. Dipunbawakake déning penari lanang kanthi gerakan tegas lan cekatan, migunakaken suara gelang kerincing.",
            aksara: "꧋ꦠꦫꦶꦪꦤ꧀ꦉꦩꦺꦴꦄꦱꦭꦺꦱꦏꦗꦺꦴꦩ꧀ꦧꦁꦭꦤ꧀ꦯꦸꦫꦨꦪ꧉ꦣꦶꦥꦸꦤ꧀ꦧꦮꦏꦏꦺꦣꦺꦤꦶꦁꦥꦼꦤꦫꦶꦭꦤꦁꦏꦤ꧀ꦛꦶꦒꦼꦫꦏꦤ꧀ꦠꦼꦒꦱ꧀ꦭꦤ꧀ꦕꦼꦏꦠꦤ꧀‌ꦩꦶꦒꦸꦤꦏꦏꦺꦤ꧀ꦱꦸꦮꦫꦒꦺꦭꦁꦏꦼꦫꦶꦚ꧀ꦕꦶꦁ꧉"
          },
          meanings: [
            { latin: "Wujud semangat prajurit Jawi Timur.", aksara: "꧋•ꦮꦸꦗꦸꦣ꧀ꦱꦼꦩꦔꦠ꧀ꦥꦿꦗꦸꦫꦶꦠ꧀ꦗꦮꦶꦠꦶꦩꦸꦂ꧉" },
            { latin: "Simbol jiwa kepemimpinan lan ketangguhan.", aksara: "꧋•ꦱꦶꦩ꧀ꦧꦺꦴꦭ꧀ꦗꦶꦮꦏꦼꦥꦼꦩꦶꦩ꧀ꦥꦶꦤꦤ꧀ꦭꦤ꧀ꦏꦼꦠꦁꦒꦸꦲꦤ꧀꧈" }
          ]
        },
        {
          name: { latin: "3. Tari Jaranan Jawa Timur", aksara: "꧇꧓꧇꧉ꦠꦫꦶꦗꦫꦤꦤ꧀ꦗꦮꦠꦶꦩꦸꦂ" },
          image: "",
          desc: {
            latin: "Mirib Jathilan saking Jawa Tengah nanging gaya Jawa Timur langkung cepet, enerjik, lan dramatis. Asring dumados trance nalika pertunjukan.",
            aksara: "꧋ꦩꦶꦫꦶꦧ꧀ꦗꦛꦶꦭꦤ꧀ꦱꦏꦶꦁꦗꦮꦠꦼꦔꦃꦤꦔꦶꦁꦒꦪꦗꦮꦠꦶꦩꦸꦂꦭꦁꦏꦸꦁꦕꦼꦥꦼꦠ꧀‌ꦄꦼꦤꦼꦂꦗꦶꦏ꧀‌ꦭꦤ꧀ꦝꦿꦩꦠꦶꦱ꧀꧈ꦄꦱꦿꦶꦁꦣꦸꦩꦣꦺꦴꦱ꧀ꦠꦿꦚ꧀ꦕꦺꦤꦭꦶꦏꦥꦼꦂꦠꦸꦚ꧀ꦗꦸꦏꦤ꧀꧈"
          },
          meanings: [
            { latin: "Simbol keberanian, kekuatan roh penjaga, lan perjuangan prajurit.", aksara: "꧋•ꦱꦶꦩ꧀ꦧꦺꦴꦭ꧀ꦏꦼꦧꦼꦫꦤꦶꦪꦤ꧀‌ꦏꦼꦏꦸꦮꦠꦤ꧀ꦫꦺꦴꦃꦥꦼꦚ꧀ꦗꦒ꧈ꦭꦤ꧀ꦥꦼꦫꦗꦸꦮꦔꦤ꧀ꦥꦿꦗꦸꦫꦶꦠ꧀꧈" }
          ]
        },
        {
          name: { latin: "4. Tari Gandrung Banyuwangi", aksara: "꧇꧔꧇꧉ꦠꦫꦶꦒꦤ꧀ꦝꦿꦸꦁꦧꦚꦸꦮꦔꦶ" },
          image: "",
          desc: {
            latin: "Gandrung punika tarian miwah ing Banyuwangi kanthi busana khas Osing. Penari wanita nari kanthi gerak luwes lan ramah, asring dipunginakaken kanggé nyambut tamu.",
            aksara: "꧋ꦒꦤ꧀ꦝꦿꦸꦁꦥꦸꦤꦶꦏꦠꦫꦶꦪꦤ꧀ꦩꦶꦮꦃꦆꦁꦧꦚꦸꦮꦔꦶꦏꦤ꧀ꦛꦶꦧꦸꦱꦤꦏ꦳ꦱ꧀ꦎꦱꦶꦁ꧉ꦥꦼꦤꦫꦶꦮꦤꦶꦠꦤꦫꦶꦏꦤ꧀ꦛꦶꦒꦼꦫꦏ꧀ꦭꦸꦮꦼꦱ꧀ꦭꦤ꧀ꦫꦩꦃ꧈ꦄꦱꦿꦶꦁꦣꦶꦥꦸꦔꦶꦤꦏꦏꦺꦤ꧀ꦏꦁꦒꦺꦚꦩ꧀ꦧꦸꦠ꧀ꦠꦩꦸ꧉"
          },
          meanings: [
            { latin: "Katresnan lan kabungahan.", aksara: "•ꦏꦠꦿꦺꦱ꧀ꦤꦤ꧀ꦭꦤ꧀ꦏꦧꦸꦔꦲꦤ꧀꧈" },
            { latin: "Lambang keramahtamahan masyarakat Osing.", aksara: "•ꦭꦩ꧀ꦧꦁꦏꦼꦫꦩꦃꦠꦩꦲꦤ꧀ꦩꦱꦾꦫꦏꦠ꧀ꦎꦱꦶꦁ꧉" }
          ]
        },
        {
          name: { latin: "5. Tari Topeng Malangan", aksara: "꧇꧕꧇꧉ꦠꦫꦶꦠꦺꦴꦥꦺꦁꦩꦭꦔꦤ꧀" },
          image: "",
          desc: {
            latin: "Tari Topeng Malangan punika pertunjukan drama tari sing nyritakake legenda Panji. Penari migunakaken topeng kanthi karakter kados Panji Asmara, Klana Sewandana, lan sanèsipun.",
            aksara: "꧋ꦠꦫꦶꦠꦺꦴꦥꦺꦁꦩꦭꦔꦤ꧀ꦥꦸꦤꦶꦏꦥꦼꦂꦠꦸꦚ꧀ꦗꦸꦏꦤ꧀ꦝꦿꦩꦠꦫꦶꦱꦶꦁꦚꦿꦶꦠꦏꦏꦺꦊꦒꦺꦤ꧀ꦝꦥꦚ꧀ꦗꦶ꧉ꦥꦼꦤꦫꦶꦩꦶꦒꦸꦤꦏꦏꦺꦤ꧀ꦠꦺꦴꦥꦺꦁꦏꦤ꧀ꦛꦶꦏꦫꦏ꧀ꦠꦼꦂꦏꦣꦺꦴꦱ꧀ꦥꦚ꧀ꦗꦶꦄꦱ꧀ꦩꦫ꧈ꦏ꧀ꦭꦤꦱꦼꦮꦤ꧀ꦝꦤ꧈ꦭꦤ꧀ꦱꦤꦺꦱꦶꦥꦸꦤ꧀꧈"
          },
          meanings: [
            { latin: "Nilai moral babagan kabecikan lan kesetiaan.", aksara: "꧋•ꦤꦶꦭꦻꦩꦺꦴꦫꦭ꧀ꦧꦧꦒꦤ꧀ꦏꦧꦺꦕꦶꦏꦤ꧀ꦭꦤ꧀ꦏꦼꦱꦼꦠꦶꦪꦄꦤ꧀꧈" },
            { latin: "Simbol perang batin antawisipun hawa nafsu lan kebijaksanaan.", aksara: "꧋•ꦱꦶꦩ꧀ꦧꦺꦴꦭ꧀ꦥꦼꦫꦁꦧꦠꦶꦤ꧀ꦄꦤ꧀ꦠꦮꦶꦱꦶꦥꦸꦤ꧀ꦲꦮꦤꦥ꦳꧀ꦱꦸꦭꦤ꧀ꦏꦼꦧꦶꦗꦏ꧀ꦱꦤꦄꦤ꧀꧈" }
          ]
        }
      ]
    },
    {
      id: "diy",
      title: {
        latin: "3. Tarian Khas Daerah Istimewa Yogyakarta",
        aksara: "꧇꧓꧇꧉ꦠꦫꦶꦪꦤ꧀ꦏ꦳ꦱ꧀ꦝꦌꦫꦃꦆꦱ꧀ꦠꦶꦩꦺꦮꦪꦺꦴꦒꦾꦏꦂꦠ"
      },
      intro: {
        latin: "Yogyakarta kagungan warisan seni tari adiluhung saking Keraton Ngayogyakarta Hadiningrat. Tarian-tariyanipun alus, filosofis, lan asring nyambung kaliyan ritual keraton.",
        aksara: "꧋ꦪꦺꦴꦒꦾꦏꦂꦠꦏꦒꦸꦔꦤ꧀ꦮꦫꦶꦱꦤ꧀ꦱꦼꦤꦶꦠꦫꦶꦄꦣꦶꦭꦸꦲꦸꦁꦱꦏꦶꦁꦏꦼꦫꦠꦺꦴꦤ꧀ꦔꦪꦺꦴꦒꦾꦏꦂꦠꦲꦣꦶꦤꦶꦔꦿꦠ꧀꧈ꦠꦫꦶꦪꦤ꧀ꦠꦫꦶꦪꦤꦶꦥꦸꦤ꧀ꦄꦭꦸꦱ꧀‌ꦥ꦳ꦶꦭꦺꦴꦱꦺꦴꦥ꦳ꦶꦱ꧀‌ꦭꦤ꧀ꦄꦱꦿꦶꦁꦚꦩ꧀ꦧꦸꦁꦏꦭꦶꦪꦤ꧀ꦫꦶꦠꦸꦮꦭ꧀ꦏꦼꦫꦠꦺꦴꦤ꧀꧈"
      },
      dances: [
        {
          name: { latin: "1. Tari Bedhaya Ketawang", aksara: "꧇꧑꧇꧉ꦠꦫꦶꦧꦼꦣꦪꦏꦼꦠꦮꦁ" },
          image: "",
          desc: {
            latin: "Tari Bedhaya Ketawang minangka tarian paling suci ing Yogyakarta. Dipunbawakake namung nalika penobatan raja. Penari sangang putri nari kanthi gerakan halus, simbolis, lan makili hubungan spiritual antarane raja lan kekuatan gaib.",
            aksara: "꧋ꦠꦫꦶꦧꦼꦣꦪꦏꦼꦠꦮꦁꦩꦶꦤꦁꦏꦠꦫꦶꦪꦤ꧀ꦥꦭꦶꦁꦱꦸꦕꦶꦆꦁꦪꦺꦴꦒꦾꦏꦂꦠ꧉ꦣꦶꦥꦸꦤ꧀ꦧꦮꦏꦏꦺꦤꦩꦸꦁꦤꦭꦶꦏꦥꦼꦤꦺꦴꦧꦠꦤ꧀ꦫꦗ꧉ꦥꦼꦤꦫꦶꦱꦔꦁꦥꦸꦠꦿꦶꦤꦫꦶꦏꦤ꧀ꦛꦶꦒꦼꦫꦏꦤ꧀ꦲꦭꦸꦱ꧀‌ꦱꦶꦩ꧀ꦧꦺꦴꦭꦶꦱ꧀‌ꦭꦤ꧀ꦩꦏꦶꦭꦶꦲꦸꦧꦸꦔꦤ꧀ꦱ꧀ꦥꦶꦫꦶꦠꦸꦮꦭ꧀ꦄꦤ꧀ꦠꦫꦤꦺꦫꦗꦭꦤ꧀ꦏꦼꦏꦸꦮꦠꦤ꧀ꦒꦆꦧ꧀꧈"
          },
          meanings: [
          image: "",
            { latin: "Kesucèn lan kekuasaan raja.", aksara: "•ꦏꦺꦱꦸꦕꦺꦤ꧀ꦭꦤ꧀ꦏꦼꦏꦸꦮꦱꦄꦤ꧀ꦫꦗ꧉" },
            { latin: "Simbol keharmonisan jagad raya.", aksara: "꧋•ꦱꦶꦩ꧀ꦧꦺꦴꦭ꧀ꦏꦼꦲꦂꦩꦺꦴꦤꦶꦱꦤ꧀ꦗꦒꦣ꧀ꦫꦪ꧉" }
          ]
        },
        {
          name: { latin: "2. Tari Beksan Wireng", aksara: "꧇꧒꧇꧉ꦠꦫꦶꦧꦼꦏ꧀ꦱꦤ꧀ꦮꦶꦫꦺꦁ" },
          image: "",
          desc: {
            latin: "Wireng punika tarian keprajuritan ingkang dipunbawakake déning kalih penari. Kados latihan perang kanthi pedhang lan perisai. Gerakipun teratur, tegas, lan sakral.",
            aksara: "꧋ꦮꦶꦫꦺꦁꦥꦸꦤꦶꦏꦠꦫꦶꦪꦤ꧀ꦏꦼꦥꦿꦗꦸꦫꦶꦠꦤ꧀ꦆꦁꦏꦁꦣꦶꦥꦸꦤ꧀ꦧꦮꦏꦏꦺꦣꦺꦤꦶꦁꦏꦭꦶꦃꦥꦼꦤꦫꦶ꧉ꦏꦣꦺꦴꦱ꧀ꦭꦠꦶꦲꦤ꧀ꦥꦼꦫꦁꦏꦤ꧀ꦛꦶꦥꦼꦣꦁꦭꦤ꧀ꦥꦼꦫꦶꦱꦻ꧉ꦒꦼꦫꦏꦶꦥꦸꦤ꧀ꦠꦼꦫꦠꦸꦂ꧈ꦠꦼꦒꦱ꧀‌ꦭꦤ꧀ꦱꦏꦿꦭ꧀꧈"
          },
          meanings: [
            { latin: "Kewajiban prajurit njaga negara.", aksara: "•ꦏꦼꦮꦗꦶꦧꦤ꧀ꦥꦿꦗꦸꦫꦶꦠ꧀ꦚ꧀ꦗꦒꦤꦼꦒꦫ꧉" },
            { latin: "Simbol disiplin, keberanian, lan keadilan.", aksara: "꧋•ꦱꦶꦩ꧀ꦧꦺꦴꦭ꧀ꦝꦶꦱꦶꦥ꧀ꦭꦶꦤ꧀‌ꦏꦼꦧꦼꦫꦤꦶꦪꦤ꧀‌ꦭꦤ꧀ꦏꦼꦄꦣꦶꦭꦤ꧀꧈" }
          ]
        },
        {
          name: { latin: "3. Tari Golek Ayun-Ayun", aksara: "꧇꧓꧇꧉ꦠꦫꦶꦒꦺꦴꦭꦺꦏ꧀ꦄꦪꦸꦤ꧀ꦄꦪꦸꦤ꧀" },
          image: "",
          desc: {
            latin: "Tarian punika nggambaraken para prawan enom ingkang lagi sinau tata krama. Penari nari kanthi ayunan tangan alus lan pasuryan sumringah.",
            aksara: "꧋ꦠꦫꦶꦪꦤ꧀ꦥꦸꦤꦶꦏꦔ꧀ꦒꦩ꧀ꦧꦫꦏꦺꦤ꧀ꦥꦫꦥꦿꦮꦤ꧀ꦄꦼꦤꦺꦴꦩ꧀ꦆꦁꦏꦁꦭꦒꦶꦱꦶꦤꦻꦴꦠꦠꦏꦿꦩ꧉ꦥꦼꦤꦫꦶꦤꦫꦶꦏꦤ꧀ꦛꦶꦄꦪꦸꦤꦤ꧀ꦠꦔꦤ꧀ꦄꦭꦸꦱ꧀ꦭꦤ꧀ꦥꦱꦸꦂꦪꦤ꧀ꦱꦸꦩꦿꦶꦔꦃ꧉"
          },
          meanings: [
            { latin: "Keanggunan wanita Jawa.", aksara: "•ꦏꦼꦄꦁꦒꦸꦤꦤ꧀ꦮꦤꦶꦠꦗꦮ꧉" },
            { latin: "Pendidikan budi pekerti lan kesopanan.", aksara: "꧋•ꦥꦼꦤ꧀ꦝꦶꦣꦶꦏꦤ꧀ꦧꦸꦣꦶꦥꦼꦏꦼꦂꦠꦶꦭꦤ꧀ꦏꦼꦱꦺꦴꦥꦤꦤ꧀꧈" }
          ]
        },
        {
          name: { latin: "4. Tari Serimpi Ludira", aksara: "꧇꧔꧇꧉ꦠꦫꦶꦱꦼꦫꦶꦩ꧀ꦥꦶꦭꦸꦣꦶꦫ" },
          image: "",
          desc: {
            latin: "Serimpi versi Yogyakarta gadhah gerak langkung alus lan filosofis. Ludira tegesipun “darah”, nggambaraken pengorbanan lan perjuangan.",
            aksara: "꧋ꦱꦼꦫꦶꦩ꧀ꦥꦶꦮ꦳ꦺꦂꦱꦶꦪꦺꦴꦒꦾꦏꦂꦠꦒꦣꦃꦒꦼꦫꦏ꧀ꦭꦁꦏꦸꦁꦄꦭꦸꦱ꧀ꦭꦤ꧀ꦥ꦳ꦶꦭꦺꦴꦱꦺꦴꦥ꦳ꦶꦱ꧀꧈ꦭꦸꦣꦶꦫꦠꦼꦒꦼꦱꦶꦥꦸꦤ꧀“ꦣꦫꦃ”꧈ꦔ꧀ꦒꦩ꧀ꦧꦫꦏꦺꦤ꧀ꦥꦼꦔꦺꦴꦂꦧꦤꦤ꧀ꦭꦤ꧀ꦥꦼꦂꦗꦸꦮꦔꦤ꧀꧈"
          },
          meanings: [
            { latin: "Keberanian, kerelaan, lan kesucèn niyat.", aksara: "꧋•ꦏꦼꦧꦼꦫꦤꦶꦪꦤ꧀‌ꦏꦼꦫꦺꦭꦄꦤ꧀‌ꦭꦤ꧀ꦏꦺꦱꦸꦕꦺꦤ꧀ꦤꦶꦪꦠ꧀꧈" },
            { latin: "Lelakon perjuangan putri keraton.", aksara: "꧋•ꦊꦭꦏꦺꦴꦤ꧀ꦥꦼꦂꦗꦸꦮꦔꦤ꧀ꦥꦸꦠꦿꦶꦏꦼꦫꦠꦺꦴꦤ꧀꧈" }
          ]
        },
        {
          name: { latin: "5. Tari Wayang Wong Yogyakarta", aksara: "꧇꧕꧇꧉ꦠꦫꦶꦮꦪꦁꦮꦺꦴꦁꦪꦺꦴꦒꦾꦏꦂꦠ" },
          image: "",
          desc: {
            latin: "Tari drama adhedhasar Ramayana lan Mahabharata. Saben tokoh gadhah gerakan khas: alus, gagah, kasar, utawa lucu.",
            aksara: "꧋ꦠꦫꦶꦣꦿꦩꦄꦣꦺꦣꦱꦂꦫꦩꦪꦤꦭꦤ꧀ꦩꦲꦧ꧀ꦲꦫꦠ꧉ꦱꦧꦼꦤ꧀ꦠꦺꦴꦏꦺꦴꦃꦒꦣꦃꦒꦼꦫꦏꦤ꧀ꦏ꦳ꦱ꧀꧇ꦄꦭꦸꦱ꧀‌ꦒꦒꦃ꧈ꦏꦱꦂ꧈ꦈꦠꦮꦭꦸꦕꦸ꧉"
          },
          meanings: [
            { latin: "Pendidikan moral lan etika.", aksara: "•ꦥꦼꦤ꧀ꦝꦶꦣꦶꦏꦤ꧀ꦩꦺꦴꦫꦭ꧀ꦭꦤ꧀ꦌꦠꦶꦏ꧉" },
            { latin: "Gambaran perjuangan antarane dharma lan adhama.", aksara: "꧋•ꦒꦩ꧀ꦧꦫꦤ꧀ꦥꦼꦂꦗꦸꦮꦔꦤ꧀ꦄꦤ꧀ꦠꦫꦤꦺꦣꦂꦩꦭꦤ꧀ꦄꦣꦩ꧉" }
          ]
        },
        {
          name: { latin: "6. Tari Angguk Kulon Progo", aksara: "꧇꧖꧇꧉ꦠꦫꦶꦄꦁꦒꦸꦏ꧀ꦏꦸꦭꦺꦴꦤ꧀ꦥꦿꦒ" },
          image: "",
          desc: {
            latin: "Tari khas putri mawi busana prajurit lan gerakan kepalanya 'ngangguk' ritmis. Asalipun saking kesenian shalawat.",
            aksara: "꧋ꦠꦫꦶꦏ꦳ꦱ꧀ꦥꦸꦠꦿꦶꦩꦮꦶꦧꦸꦱꦤꦥꦿꦗꦸꦫꦶꦠ꧀ꦭꦤ꧀ꦒꦼꦫꦏꦤ꧀ꦏꦼꦥꦭꦚ\"ꦔꦁꦒꦸꦏ꧀\"ꦫꦶꦠ꧀ꦩꦶꦱ꧀꧈ꦄꦱꦭꦶꦥꦸꦤ꧀ꦱꦏꦶꦁꦏꦼꦱꦼꦤꦶꦪꦤ꧀ꦱ꧀ꦲꦭꦮꦠ꧀꧈"
          },
          meanings: [
            { latin: "Ketaatan, keikhlasan, lan kebersamaan.", aksara: "꧋•ꦏꦼꦠꦄꦠꦤ꧀‌ꦏꦼꦆꦏ꦳꧀ꦭꦱꦤ꧀‌ꦭꦤ꧀ꦏꦼꦧꦼꦂꦱꦩꦄꦤ꧀꧈" }
          ]
        }
      ]
    }
  ],
  summary: {
    title: {
      latin: "Ringkesan Bedane Tarian Antar Daerah",
      aksara: "ꦫꦶꦁꦏꦺꦱꦤ꧀ꦧꦼꦣꦤꦺꦠꦫꦶꦪꦤ꧀ꦄꦤ꧀ꦠꦂꦣꦌꦫꦃ"
    },
    items: [
      {
        region: { latin: "Jawa Tengah (Lemah Lembut – Simetris – Halus)", aksara: "ꦗꦮꦠꦼꦔꦃ(ꦊꦩꦃꦊꦩ꧀ꦧꦸꦠ꧀–ꦱꦶꦩꦺꦠꦿꦶꦱ꧀–ꦲꦭꦸꦱ꧀)" },
        points: [
          { latin: "Cenderung alus, tertata, lan gemulai.", aksara: "꧋•ꦕꦼꦤ꧀ꦝꦼꦫꦸꦁꦄꦭꦸꦱ꧀‌ꦠꦼꦂꦠꦠ꧈ꦭꦤ꧀ꦒꦼꦩꦸꦭꦻ꧉" },
          { latin: "Dipungambaraken kanthi filosofis lan penuh kesopanan.", aksara: "꧋•ꦣꦶꦥꦸꦔꦩ꧀ꦧꦫꦏꦺꦤ꧀ꦏꦤ꧀ꦛꦶꦥ꦳ꦶꦭꦺꦴꦱꦺꦴꦥ꦳ꦶꦱ꧀ꦭꦤ꧀ꦥꦼꦤꦸꦃꦏꦼꦱꦺꦴꦥꦤꦤ꧀꧈" }
        ]
      },
      {
        region: { latin: "Jawa Timur (Enerjik – Gagah – Cepet)", aksara: "ꦗꦮꦠꦶꦩꦸꦂ(ꦄꦼꦤꦼꦂꦗꦶꦏ꧀–ꦒꦒꦃ–ꦕꦼꦥꦼꦠ꧀)" },
        points: [
          { latin: "Irama dinamis, karakter tegas, emosional.", aksara: "꧋•ꦆꦫꦩꦣꦶꦤꦩꦶꦱ꧀‌ꦏꦫꦏ꧀ꦠꦼꦂꦠꦼꦒꦱ꧀‌ꦌꦩꦺꦴꦱꦶꦪꦺꦴꦤꦭ꧀꧈" },
          { latin: "Asring wonten unsur magis lan keprajuritan.", aksara: "꧋•ꦄꦱꦿꦶꦁꦮꦺꦴꦤ꧀ꦠꦺꦤ꧀ꦈꦤ꧀ꦱꦸꦂꦩꦒꦶꦱ꧀ꦭꦤ꧀ꦏꦼꦥꦿꦗꦸꦫꦶꦠꦤ꧀꧈" }
        ]
      },
      {
        region: { latin: "Yogyakarta (Adiluhung – Simbolis – Filosofis)", aksara: "ꦪꦺꦴꦒꦾꦏꦂꦠ(ꦄꦣꦶꦭꦸꦲꦸꦁ–ꦱꦶꦩ꧀ꦧꦺꦴꦭꦶꦱ꧀–ꦥ꦳ꦶꦭꦺꦴꦱꦺꦴꦥ꦳ꦶꦱ꧀)" },
        points: [
          { latin: "Terkait erat karo keraton.", aksara: "•ꦠꦼꦂꦏꦻꦠ꧀ꦄꦼꦫꦠ꧀ꦏꦫꦺꦴꦏꦼꦫꦠꦺꦴꦤ꧀꧈" },
          { latin: "Gerakan alus nanging sarat makna spiritual.", aksara: "꧋•ꦒꦼꦫꦏꦤ꧀ꦄꦭꦸꦱ꧀ꦤꦔꦶꦁꦱꦫꦠ꧀ꦩꦏ꧀ꦤꦱ꧀ꦥꦶꦫꦶꦠꦸꦮꦭ꧀꧈" }
        ]
      }
    ]
  }
};

const Header = ({ isLatin, toggleLanguage }) => (
  <header className="sticky top-0 z-50 bg-[#3E2723] text-[#F5F5DC] shadow-lg border-b-4 border-[#8D6E63]">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Feather className="w-6 h-6 text-[#D7CCC8]" />
        <h1 className={`font-bold text-xl md:text-2xl tracking-wider ${!isLatin ? 'font-javanese' : 'font-serif'}`}>
          {isLatin ? contentData.header.title.latin : contentData.header.title.aksara}
        </h1>
      </div>
      <button 
        onClick={toggleLanguage}
        className="flex items-center space-x-2 bg-[#8D6E63] hover:bg-[#6D4C41] text-[#F5F5DC] px-4 py-2 rounded-lg transition-colors duration-300 font-semibold shadow-md border border-[#A1887F]"
      >
        <BookOpen className="w-5 h-5" />
        <span>{isLatin ? "Aksara Jawa" : "Latin"}</span>
      </button>
    </div>
  </header>
);

const Hero = ({ isLatin }) => (
  <div className="relative py-24 bg-[#EFEBE9] border-b border-[#D7CCC8] overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/batik-rambutan.png')]"></div>
    <div className="container mx-auto px-4 relative z-10 text-center">
      <h2 className={`text-4xl md:text-6xl font-bold text-[#3E2723] mb-6 drop-shadow-sm ${!isLatin ? 'font-javanese leading-relaxed' : 'font-serif'}`}>
        {isLatin ? contentData.header.title.latin : contentData.header.title.aksara}
      </h2>
      <div className="w-32 h-1 bg-[#8D6E63] mx-auto mb-6"></div>
      <p className={`text-xl md:text-2xl text-[#5D4037] max-w-2xl mx-auto ${!isLatin ? 'font-javanese' : 'font-sans'}`}>
        {isLatin ? contentData.header.subtitle.latin : contentData.header.subtitle.aksara}
      </p>
    </div>
  </div>
);

const DanceCard = ({ dance, isLatin }) => {
  // Placeholder images based on dance name to ensure uniqueness if needed, 
  // but simpler to use generic placeholders as requested.
  const imageUrl = dance.image;
  
  return (
    <div className="bg-[#FFF8E1] rounded-xl shadow-lg overflow-hidden border border-[#D7CCC8] hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full">
      <div className="h-48 overflow-hidden relative group">
        <img 
          src={imageUrl} 
          alt={dance.name.latin} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 sepia-[.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/70 to-transparent"></div>
        <h3 className={`absolute bottom-3 left-4 text-white font-bold text-lg drop-shadow-md ${!isLatin ? 'font-javanese text-xl' : 'font-serif'}`}>
          {isLatin ? dance.name.latin : dance.name.aksara}
        </h3>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <p className={`text-[#5D4037] mb-4 flex-grow leading-relaxed ${!isLatin ? 'font-javanese text-lg' : 'font-sans'}`}>
          {isLatin ? dance.desc.latin : dance.desc.aksara}
        </p>
        
        <div className="bg-[#EFEBE9] p-4 rounded-lg border-l-4 border-[#8D6E63]">
          <h4 className={`font-bold text-[#3E2723] mb-2 text-sm uppercase tracking-widest ${isLatin ? '' : 'hidden'}`}>
            Makna:
          </h4>
          <h4 className={`font-bold text-[#3E2723] mb-2 text-lg ${!isLatin ? 'font-javanese' : 'hidden'}`}>
            ꦩꦏ꧀ꦤ꧇
          </h4>
          <ul className="space-y-2">
            {dance.meanings.map((meaning, idx) => (
              <li key={idx} className={`text-[#5D4037] text-sm flex items-start ${!isLatin ? 'font-javanese text-lg' : ''}`}>
                <span className="mr-2 text-[#8D6E63]">•</span>
                <span>{isLatin ? meaning.latin : meaning.aksara}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const RegionSection = ({ section, isLatin }) => (
  <section className="py-16 border-b border-[#D7CCC8] last:border-0 bg-[#FAFAFA]">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center max-w-4xl mx-auto">
        <span className="text-[#8D6E63] font-bold tracking-widest uppercase mb-2 block"></span>
        <h2 className={`text-3xl md:text-4xl font-bold text-[#3E2723] mb-6 ${!isLatin ? 'font-javanese leading-relaxed' : 'font-serif'}`}>
          {isLatin ? section.title.latin : section.title.aksara}
        </h2>
        <p className={`text-[#5D4037] text-lg leading-relaxed ${!isLatin ? 'font-javanese text-xl text-left md:text-center' : ''}`}>
          {isLatin ? section.intro.latin : section.intro.aksara}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {section.dances.map((dance, index) => (
          <DanceCard key={index} dance={dance} isLatin={isLatin} />
        ))}
      </div>
    </div>
  </section>
);

const SummarySection = ({ summary, isLatin }) => (
  <section className="py-16 bg-[#D7CCC8]/30">
    <div className="container mx-auto px-4">
      <h2 className={`text-3xl font-bold text-[#3E2723] mb-10 text-center ${!isLatin ? 'font-javanese' : 'font-serif'}`}>
        {isLatin ? summary.title.latin : summary.title.aksara}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summary.items.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#8D6E63]">
            <h3 className={`font-bold text-[#3E2723] text-lg mb-4 ${!isLatin ? 'font-javanese text-xl' : 'font-serif'}`}>
              {isLatin ? item.region.latin : item.region.aksara}
            </h3>
            <ul className="space-y-2">
              {item.points.map((point, pIdx) => (
                <li key={pIdx} className={`text-[#5D4037] flex items-start ${!isLatin ? 'font-javanese text-lg' : ''}`}>
                   <span className="mr-2 text-[#8D6E63] mt-1">▹</span>
                   <span>{isLatin ? point.latin : point.aksara}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CreditCard = ({ name, role, image }) => (
  <div className="bg-[#3E2723] p-6 rounded-xl shadow-lg border border-[#5D4037] text-center transform hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center">
    <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-[#A1887F] bg-[#5D4037] flex items-center justify-center">
      {image ? (
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover" 
        />
      ) : (
        <Users className="w-10 h-10 text-[#F5F5DC]" />
      )}
    </div>
    <h3 className="text-[#F5F5DC] font-serif font-bold text-lg mb-1">{name}</h3>
    <p className="text-[#A1887F] text-sm uppercase tracking-wide">{role}</p>
  </div>
);

const CreditsPage = () => {
  // 6 Placeholders as requested
  const credits = [
    { name: "3. Lathifa Hasna ", role: "Contributor", image: "/fotoprofil/3.webp" },
    { name: "11. Muhammad Haidar Hylmi Zarkasi", role: "Contributor", image: "/fotoprofil/11.webp" },
    { name: "12. Muhammad Lingga Adira Prakosa", role: "Contributor", image: "/fotoprofil/12.webp" },
    { name: "20. Radinka Arkananta Reswara", role: "Contributor", image: "/fotoprofil/21.webp" },
    { name: "35. Yusuf Miftachul Rizki", role: "Contributor", image: "/fotoprofil/35.webp" },
    { name: "36. Zhidan Ezar", role: "Contributor",image: "/fotoprofil/36.webp" },
  ];

  return (
    <section className="py-20 bg-[#271c19] text-[#F5F5DC]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Feather className="w-12 h-12 text-[#8D6E63] mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">ꦩꦠꦸꦂ ꦤꦸꦮꦸꦤ꧀</h2>
          <p className="text-[#A1887F]">ꦲꦤ꧀ꦒ꧀ꦒꦺꦴꦠ ꦏꦺꦭꦺꦴꦩ꧀ꦥꦺꦴꦏ꧀</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {credits.map((person, idx) => (
            <CreditCard key={idx} name={person.name} role={person.role} image={person.image} />
          ))}
        </div>
        
        <div className="mt-16 text-center text-[#5D4037] text-sm">
          <p>&copy; {new Date().getFullYear()} Cukurukuk</p>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [isLatin, setIsLatin] = useState(true);

  const toggleLanguage = () => {
    setIsLatin(!isLatin);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#3E2723] font-sans selection:bg-[#8D6E63] selection:text-white">
      {/* Import Noto Sans Javanese dynamically */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Javanese&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-javanese { font-family: 'Noto Sans Javanese', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>

      <Header isLatin={isLatin} toggleLanguage={toggleLanguage} />
      
      <main>
        <Hero isLatin={isLatin} />
        
        {contentData.sections.map(section => (
          <RegionSection key={section.id} section={section} isLatin={isLatin} />
        ))}
        
        <SummarySection summary={contentData.summary} isLatin={isLatin} />
        
        <CreditsPage />
      </main>
    </div>
  );
};

export default App;
