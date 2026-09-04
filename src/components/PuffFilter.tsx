/**
 * The filter that turns flat type and flat squares into inflated foil.
 *
 * feSpecularLighting over a blurred alpha gives the hard little highlight a
 * balloon gets from a window; the offset inner shade underneath it is the seam
 * where the foil is welded. Rendered once per page and referenced by
 * `filter: url(#puff)`.
 */
export function PuffFilter() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <filter id="puff" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="blur" />
          <feSpecularLighting
            in="blur"
            surfaceScale="9"
            specularConstant="0.9"
            specularExponent="18"
            lightingColor="#ffffff"
            result="spec"
          >
            <fePointLight x="-2000" y="-6000" z="9000" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn" />
          <feComposite
            in="SourceGraphic"
            in2="specIn"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="lit"
          />
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="inner" />
          <feOffset in="inner" dx="0" dy="6" result="innerOff" />
          <feComposite
            in="innerOff"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="innerShade"
          />
          <feFlood floodColor="#000000" floodOpacity="0.22" result="shadeColor" />
          <feComposite in="shadeColor" in2="innerShade" operator="in" result="shade" />
          <feComposite in="shade" in2="lit" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
