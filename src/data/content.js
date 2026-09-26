import herbKasthuriManjal from '../assets/herbs/kasthuri-manjal.jpg'
import herbAvaramPoo from '../assets/herbs/avaram-poo.jpg'
import herbRose from '../assets/herbs/rose.jpg'
import herbVetiver from '../assets/herbs/vetiver.jpg'
import herbAmla from '../assets/herbs/amla.jpg'
import herbCurryLeaves from '../assets/herbs/curry-leaves.jpg'
import herbHibiscus from '../assets/herbs/hibiscus.jpg'
import herbSeekakai from '../assets/herbs/seekakai.jpg'

export const ingredients = [
  { name: 'Kasthuri Manjal', tamil: 'கஸ்தூரி மஞ்சள்', note: 'Wild turmeric for glow', shape: 'root', tone: '#d8a234', image: herbKasthuriManjal },
  { name: 'Avaram Poo', tamil: 'ஆவாரம் பூ', note: 'Calms and evens skin', shape: 'flower', tone: '#e2c04a', image: herbAvaramPoo },
  { name: 'Rose', tamil: 'ரோஜா', note: 'Softens and tones', shape: 'flower', tone: '#c9636f', image: herbRose },
  { name: 'Vetiver', tamil: 'வெட்டிவேர்', note: 'Cools the scalp', shape: 'grass', tone: '#7d9a63', image: herbVetiver },
  { name: 'Amla', tamil: 'நெல்லி', note: 'Vitamin C rich', shape: 'fruit', tone: '#96b357', image: herbAmla },
  { name: 'Curry Leaves', tamil: 'கருவேப்பிலை', note: 'Roots & pigmentation', shape: 'leaf', tone: '#3f7a3f', image: herbCurryLeaves },
  { name: 'Hibiscus', tamil: 'செம்பருத்தி', note: 'Shine & conditioning', shape: 'flower', tone: '#c8394a', image: herbHibiscus },
  { name: 'Seekakai', tamil: 'சீயக்காய்', note: 'Gentle natural cleanse', shape: 'fruit', tone: '#8a5a31', image: herbSeekakai },
]

export const benefits = [
  {
    icon: 'Leaf',
    title: '100% Organic',
    text: 'Every herb is sourced, cleaned, sun-dried and ground by hand — in small batches only.',
    tamil: '100% இயற்கை',
  },
  {
    icon: 'Home',
    title: 'Homemade Care',
    text: 'Made at home the traditional way, the same recipes passed down in our family.',
    tamil: 'வீட்டில் தயாரிப்பு',
  },
  {
    icon: 'Ban',
    title: 'No Chemicals',
    text: 'Zero parabens, zero sulphates, zero added fragrance, zero preservatives.',
    tamil: 'ரசாயனங்கள் இல்லை',
  },
  {
    icon: 'Sparkles',
    title: 'Visible Results',
    text: 'Consistent use brings back the natural glow of your skin and the strength of your hair.',
    tamil: 'நல்ல பலன்கள்',
  },
  {
    icon: 'HeartHandshake',
    title: 'Made With Love',
    text: 'One family, two hands and a lot of patience behind every single jar.',
    tamil: 'அன்புடன் தயார்',
  },
  {
    icon: 'Truck',
    title: 'Easy WhatsApp Order',
    text: 'Send one message and we pack, confirm and dispatch your order quickly.',
    tamil: 'வாட்ஸ்அப் ஆர்டர்',
  },
]

export const ritualSteps = [
  {
    step: '01',
    title: 'Scoop & Mix',
    text: 'Take two spoons of the podi or pack in a bowl. Add warm water, curd or aloe gel and mix into a smooth paste.',
  },
  {
    step: '02',
    title: 'Apply & Massage',
    text: 'Dampen your skin or hair, then apply gently with a circular massage. Leave it on for 5 to 10 minutes.',
  },
  {
    step: '03',
    title: 'Rinse & Glow',
    text: 'Rinse with clean water, pat dry and follow with a few drops of the herbal hair oil. Repeat 2-3 times a week.',
  },
]

export const testimonials = [
  {
    name: 'Placeholder Review 1',
    place: 'Coimbatore',
    rating: 5,
    text: 'Replace this with a real customer review. The carousel, star rating and layout are ready for your own content.',
  },
  {
    name: 'Placeholder Review 2',
    place: 'Erode',
    rating: 5,
    text: 'Replace this with a real customer review. Keep it short — one or two lines works best in this slider.',
  },
  {
    name: 'Placeholder Review 3',
    place: 'Salem',
    rating: 5,
    text: 'Replace this with a real customer review. You can add as many entries as you like in src/data/content.js.',
  },
]

export const stats = [
  { value: 4, suffix: '', label: 'Signature herbal products' },
  { value: 100, suffix: '%', label: 'Natural, chemical free' },
  { value: 0, suffix: '', label: 'Preservatives or artificial colours' },
  { value: 1000, suffix: '+', label: 'Happy order messages on WhatsApp' },
]
