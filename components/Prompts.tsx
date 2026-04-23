import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, X, Maximize2 } from 'lucide-react';
import { createPortal } from 'react-dom';
import './Prompts.css';
import './Wallpapers.css'; 

const Prompts: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const promptList = [
    {
      id: 'p1',
      category: 'Portrait Illustration',
      image: '/promptai/p1.png',
      prompt: 'Create a hyper-realistic portrait illustration based on the provided photograph. The artwork must accurately replicate the subject with precise likeness and high-detail rendering. Present the face in an intense, emotionally charged expression, captured from a dramatic close-up with a slightly low-angle perspective. Depict the hair as windswept and dynamic, with sharp, defined strands that convey movement. Use bright, even lighting to produce soft highlights on the skin and hair, revealing detailed skin texture, fine pores, natural shadows, and vivid reflections in the eyes. Dress the subject in an oversized black hoodie that appears natural and well-integrated into the scene. Set the subject against a solid, bold background color-such as vibrant yellow-to create strong visual contrast and impact. The final illustration should blend semi-photorealistic and semi-illustrative aesthetics, characteristic of modern poster art, emphasizing dynamic energy, clarity, vibrant colors, and sharp, high-contrast details.',
      model: 'Stable Diffusion XL'
    },
    {
      id: 'p11',
      category: 'Avant-Garde Mono',
      image: '/promptai/p11.png',
      prompt: 'close-up black and white fashion portrait, preserve all facial features exactly as in the reference photo, do not change face structure, age, hair texture, or skin tone. subject wears sporty wraparound dark sunglasses with reflective lenses, and a high-collared bulky black garment covering the neck. neutral expression, centered composition, white studio background. high-contrast lighting, sharp details, shallow depth of field, subtle vignette, dramatic monochrome tones, minimal avant-garde editorial.',
      model: 'Flux.1 Pro'
    },
    {
      id: 'p5',
      category: 'Minimalist Studio',
      image: '/promptai/p5.png?v=2',
      prompt: 'Convert this image so that the man is sitting in the center of a high-back armchair in a minimal, monochromatic studio setting. Replace the current background with a seamless wall and floor in a single solid color, either deep teal, slate blue, or forest green. Dress him in a matching jacket and pants in the same color, paired with a simple white T-shirt underneath. Keep his sneakers clean and white with subtle accents matching the outfit. Retain his wristwatch as an accessory. His posture should be upright and composed, with both feet flat on the ground and his hands gently clasped in his lap. The chair should match the overall color scheme to create a seamless monochrome effect. Lighting should be soft, even, and studio-style, with minimal shadows. The final image should be ultra-high-resolution, sleek, modern, and minimalist, in the style of high-fashion portrait photography.',
      model: 'DALL-E 3'
    },
    {
      id: 'p2',
      category: 'Editorial Portrait',
      image: '/promptai/p2.png',
      prompt: 'A high-resolution, ultra-detailed editorial portrait of the subject in reference image sitting on a small red wooden stool in the middle of a vast field of white daisies. The subject is wearing a vintage patchwork denim jacket over a dark patterned shirt, paired with textured paisley trousers and white sneakers. The pose is relaxed and centered, looking directly at the camera with a calm expression. Soft, natural daylight under a slightly cloudy sky. Shallow depth of field with daisies in the extreme foreground blurred, creating a 3D effect. 8k resolution, cinematic lighting, shot on 35mm lens, realistic skin textures and fabric details',
      model: 'Midjourney v6'
    },
    {
      id: 'p3',
      category: 'Luxury Lifestyle',
      image: '/promptai/p3.png',
      prompt: 'A handsome man with tousled hair reclining confidently in an ornate armchair inside a luxurious, manor-like room, wears an alligator-skin jacket over a white shirt; exuding sophistication and relaxed elegance. Holding a pair of glasses in one hand and draping his arm casually, he gazes directly at the camera with a charismatic expression. The background features old drapes, polished wood panels, and glowing chandeliers, creating a rich, regal, and cinematic atmosphere. 8k Ultra Realistic',
      model: 'Flux.1 Pro'
    },
    {
      id: 'p4',
      category: 'Cyber Noir',
      image: '/promptai/p4.png',
      prompt: 'Ultra-realistic cinematic fashion-editorial night street portrait of a person from input photo, vertical 4:5 framing, full-body hero shot with the subject standing slightly left-of-center beside a parked muscle car, hands in pockets, relaxed stance, chin slightly raised, gaze toward camera with a cool, self-possessed expression; styling: minimalist urban fit — light bomber jacket over a white tee, loose dark pants, chunky sneakers, thin chain necklace, dark sunglasses at night for an edgy editorial vibe; mood and environment: gas station at night with a glowing canopy and pumps in the mid-background, heavy blue-green haze and drifting smoke, wet asphalt with puddles reflecting neon and taillight glow; the car\'s rear quarter dominates the right side with a bright red-orange tail light strip. Lighting: moody low-key mix of cool cyan/teal ambient (∼6500-8000K) filling the fog and background plus warm practical reds/oranges (∼2400-3200K) from signage and taillights creating rim highlights on the subject and car; strong contrast, soft bloom, cinematic diffusion. Background palette: deep near-black shadows (HEX #0A0D10), teal fog (HEX #2A6D7A), cool blue wash (HEX #3D7FA0), warm neon/taillight accents (HEX #E05A3A), subtle station whites (HEX #D7DCE0). Lens simulation: 35mm-50mm, f/1.8-f/2.2, shallow depth of field with subject sharp and background pumps softly blurred; pronounced bokeh, light halation, fine film grain, slight vignette, ultra-realistic wet surface textures and metal reflections. Atmospheric noir street-racing mood. Editorial, modern, high-detail, cinematic composition, ultra-realistic textures, professional fashion photography style.',
      model: 'Midjourney v6'
    },
    {
      id: 'p6',
      category: 'Vogue Editorial',
      image: '/promptai/p6.png',
      prompt: 'Create a minimal editorial portrait of a stylish Smiling man with (same face as reference) against a bright white backdrop framed by soft vignette edges, wearing oversized black sunglasses with orange lenses, a neon blue hoodie, and small gold earrings. Bright studio lighting, minimal light background. Modern fashion editorial photography, clean and vibrant style. Vogue cover style. Rim lighting outlines his face for an 8K studio-quality, HDR minimalist aesthetic.',
      model: 'Midjourney v6'
    },
    {
      id: 'p7',
      category: 'Cinematic Wes Anderson',
      image: '/promptai/p7.png',
      prompt: 'portrait of an middle-age man sitting in a coffee plant garden, facing camera, wearing brown and red outfit, sunglasses. he is sitting on a chair and drinking a cup coffee. the rich colors and symmetrical composition are in the style of wes anderson. this is a fashion photography piece by sina lansky, featuring a vibrant color palette, a background of tropical plants and green parakeet flying around. the image is highly detailed with intricate details and a professional lighting setup, ultra realistic',
      model: 'Flux.1 Pro'
    },
    {
      id: 'p8',
      category: 'Noir Portrait',
      image: '/promptai/p8.png',
      prompt: 'A bold black-and-white portrait with strong frontal lighting and refined contrast that emphasizes facial structure and texture. The clean background and centered composition create a powerful editorial presence, reminiscent of high-end magazine covers. This style highlights confidence, maturity, and a cinematic masculinity, making the portrait feel timeless, authoritative, and visually striking.',
      model: 'Stable Diffusion XL'
    },
    {
      id: 'p9',
      category: 'Candid Reality',
      image: '/promptai/p9.png',
      prompt: 'A spontaneous medium full shot of a young man with short brown hair and classic aviator sunglasses casually leaning against a black luxury Range Rover SUV with tinted windows, outdoors in a mountainous forest setting. He wears an olive green shearling jacket over a white t-shirt and dark pants, one hand relaxed in his jacket pocket, showing natural skin texture and neat grooming. The warm, late afternoon fading daylight softly illuminates his face and the jacket\'s fabric, as well as the detailed tire and door surfaces of the vehicle. In the softly blurred background, snowy ground and evergreen trees frame rocky blue-gray mountains, lending authentic depth with a cool earthy palette. The composition is centered yet casual, captured with a standard lens at moderate depth of field, embodying genuine spontaneity and intimate realism typical of candid iPhone photography',
      model: 'Flux.1 Pro'
    },
    {
      id: 'p10',
      category: 'Retro Luxury',
      image: '/promptai/p10.png',
      prompt: 'A cinematic fashion portrait of an Asian man in his early 30s standing confidently in front of a vintage green classic sedan. He wears a dark green fur coat layered over a mustard-brown cardigan and a patterned yellow shirt, olive tailored trousers, brown leather loafers with mustard socks, and a dark green fedora hat. He also wears round gold-rimmed sunglasses and a silver necklace with a cross pendant. The scene is set in a grand neoclassical colonnade with tall stone pillars, a symmetrical corridor composition, and a black-and-white checkered marble floor. Soft morning fog fills the background, with pink flowers lining the walkway and blurred people in the distance. Lighting is soft cinematic daylight with diffused highlights and gentle shadows. Color grading leans toward muted greens, warm mustard tones, and teal shadows, creating a retro luxury mood. Shot on a full-frame camera, 85mm lens, shallow depth of field, ultra-detailed fabric textures',
      model: 'Midjourney v6'
    },
    {
      id: 'p12',
      category: 'Cinematic Matrix',
      image: '/promptai/p12.png',
      prompt: 'Use the exact person from the reference image. Do not change face, age, hairstyle, or skin tone. Preserve identity 100%. Recreate the scene: person sitting on a vintage leather armchair in the middle of apocalyptic city ruins, wearing black leather coat, black shirt, black pants, black boots, and small round sunglasses. Right hand holding a red pill, left hand holding a blue pill, both palms open toward camera. Dark stormy sky, destroyed skyscrapers in background, rubble and concrete debris on ground. Moody cinematic lighting, desaturated teal-gray color grading, ultra-realistic, sharp facial detail.',
      model: 'Flux.1 Pro'
    }
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="prompts-container w-full pb-20">
      <div className="mb-12">
        <h1 className="hub-title">
          PROMPT <span>HUB</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promptList.map((item) => (
          <div key={item.id} className="prompt-card">
            <div 
              className="prompt-image-wrapper cursor-zoom-in group"
              onClick={() => setZoomImage(item.image)}
            >
              <img src={item.image} alt="AI Generation" className="prompt-image" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                    <Maximize2 size={24} className="text-white" />
                 </div>
              </div>
            </div>

            <div className="prompt-content">
              <span className="prompt-tag">{item.category}</span>
              <div className="prompt-text-area custom-scrollbar">
                {item.prompt}
              </div>

              <button 
                onClick={() => handleCopy(item.id, item.prompt)}
                className={`btn-copy-prompt ${copiedId === item.id ? 'copied' : ''}`}
              >
                {copiedId === item.id ? (
                  <>
                    <Check size={16} />
                    Prompt Copied
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy System Prompt
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {zoomImage && createPortal(
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
            onClick={() => setZoomImage(null)}
          >
            <motion.button 
              className="absolute top-6 right-6 p-4 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all z-[10000]"
              onClick={() => setZoomImage(null)}
            >
              <X size={24} />
            </motion.button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={zoomImage} 
                alt="Zoomed View" 
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5" 
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default Prompts;
