/**
 * Las 4 flores dibujadas a mano. Cada corola está centrada en (100, 92)
 * dentro del lienzo de 200x340 y cada tallo baja hasta el borde inferior.
 * Flower.jsx dibuja una flor suelta; Bouquet.jsx reutiliza solo las corolas.
 */

export const HEAD_X = 100
export const HEAD_Y = 92

export function ring(count, offset, render) {
  return Array.from({ length: count }, (_, i) =>
    render(offset + (i * 360) / count, i),
  )
}

export const HEADS = {
  daisy: (
    <>
      {ring(8, 0, (angle, i) => (
        <ellipse
          key={`p${i}`}
          cx={HEAD_X}
          cy={HEAD_Y - 42}
          rx="21"
          ry="29"
          transform={`rotate(${angle} ${HEAD_X} ${HEAD_Y})`}
        />
      ))}
      <circle cx={HEAD_X} cy={HEAD_Y} r="25" className="flower__core" />
    </>
  ),
  poppy: (
    <>
      {ring(5, 18, (angle, i) => (
        <ellipse
          key={`p${i}`}
          cx={HEAD_X}
          cy={HEAD_Y - 33}
          rx="35"
          ry="31"
          transform={`rotate(${angle} ${HEAD_X} ${HEAD_Y})`}
        />
      ))}
      <circle cx={HEAD_X} cy={HEAD_Y} r="17" className="flower__core" />
    </>
  ),
  tulip: (
    <>
      <path d="M46 96C40 44 76 22 100 52C124 22 160 44 154 96C150 141 125 169 100 169C75 169 50 141 46 96Z" />
      <path className="flower__detail" d="M72 62C64 106 72 141 92 166" />
      <path className="flower__detail" d="M128 62C136 106 128 141 108 166" />
    </>
  ),
  pompon: (
    <>
      {ring(11, 0, (angle, i) => (
        <ellipse
          key={`o${i}`}
          cx={HEAD_X}
          cy={HEAD_Y - 45}
          rx="13"
          ry="19"
          transform={`rotate(${angle} ${HEAD_X} ${HEAD_Y})`}
        />
      ))}
      {ring(7, 22, (angle, i) => (
        <ellipse
          key={`i${i}`}
          cx={HEAD_X}
          cy={HEAD_Y - 23}
          rx="12"
          ry="15"
          transform={`rotate(${angle} ${HEAD_X} ${HEAD_Y})`}
        />
      ))}
      <circle cx={HEAD_X} cy={HEAD_Y} r="12" className="flower__core" />
    </>
  ),
}

export const SHAPES = {
  daisy: {
    head: HEADS.daisy,
    stem: 'M100 150C100 212 81 252 90 338',
    leaf: 'M92 236C62 219 43 234 39 256C62 270 85 259 92 236Z',
  },
  poppy: {
    head: HEADS.poppy,
    stem: 'M100 148C100 212 121 258 110 338',
    leaf: 'M108 250C138 233 158 248 162 270C139 284 116 273 108 250Z',
  },
  tulip: {
    head: HEADS.tulip,
    stem: 'M100 164C100 222 93 272 102 338',
    leaf: 'M94 252C66 238 47 253 44 274C66 287 87 275 94 252Z',
  },
  pompon: {
    head: HEADS.pompon,
    stem: 'M100 152C100 214 77 256 87 338',
    leaf: null,
  },
}
