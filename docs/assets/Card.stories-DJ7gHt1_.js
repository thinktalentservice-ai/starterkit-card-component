import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{O as n,t as r}from"./iframe-Don1r3dV.js";function i(e,t){t!==void 0&&o[t]===void 0&&s()&&!c.has(t)&&(c.add(t),console.warn(`[@devopsnext/starterkit-card-component] Unknown variant "${t}" — falling back to tone="${a.tone}" fill="${a.fill}". Valid: ${Object.keys(o).join(`, `)}. Or set tone/fill directly.`));let n=t&&o[t]||{};return{tone:e.tone??n.tone??a.tone,fill:e.fill??n.fill??a.fill}}var a,o,s,c,l=e((()=>{a={tone:`neutral`,fill:`glass`},o={glass:{tone:`neutral`,fill:`glass`},surface:{tone:`neutral`,fill:`surface`},elevated:{tone:`neutral`,fill:`elevated`},outline:{tone:`neutral`,fill:`outline`},primary:{tone:`primary`,fill:`gradient`},secondary:{tone:`secondary`,fill:`gradient`},accent:{tone:`accent`,fill:`gradient`},success:{tone:`success`,fill:`gradient`},warning:{tone:`warning`,fill:`gradient`},danger:{tone:`danger`,fill:`gradient`},info:{tone:`info`,fill:`gradient`},"accent-green":{tone:`accent-green`,fill:`gradient`},"accent-pink":{tone:`accent-pink`,fill:`gradient`}},s=()=>typeof process<`u`&&!1,c=new Set}));function u(e,t){let{tone:n,fill:r,pad:a=`md`,variant:o,interactive:s,accent:c,noBorder:l=!1,fullHeight:u=!1,disabled:d=!1,as:m=`div`,children:h,className:g,style:_,href:v,onClick:y,onKeyDown:b,...x}=e,S=i({tone:n,fill:r},o),C=typeof y==`function`||v!==void 0,w=s??C,T={className:p(`ic-card`,g),"data-tone":S.tone,"data-fill":S.fill,"data-pad":a,...w&&!d?{"data-interactive":``}:{},...c?{"data-accent":``}:{},...l?{"data-no-border":``}:{},...u?{"data-full-height":``}:{},style:c?{"--ic-accent":c,..._}:_};if(v!==void 0){let e=d?{role:`link`,"aria-disabled":!0,tabIndex:-1}:{href:v,onClick:y};return(0,f.jsx)(`a`,{ref:t,...x,onKeyDown:b,...T,...e,children:h})}let E=m;if(!C)return(0,f.jsx)(E,{ref:t,...x,onKeyDown:b,...T,children:h});let D=e=>{e.target===e.currentTarget&&y?.(e)},O=d?{role:`button`,"aria-disabled":!0,tabIndex:-1}:{role:`button`,tabIndex:0,onClick:y,onKeyDown:e=>{b?.(e),!(e.defaultPrevented||d)&&e.target===e.currentTarget&&(e.key===` `&&e.preventDefault(),e.key===`Enter`&&(e.preventDefault(),D(e)))},onKeyUp:e=>{d||e.key===` `&&(e.preventDefault(),D(e))}};return(0,f.jsx)(E,{ref:t,...x,...T,...O,children:h})}var d,f,p,m,h=e((()=>{d=t(n(),1),l(),f=r(),p=(...e)=>e.filter(Boolean).join(` `),m=(0,d.forwardRef)(u),m.displayName=`Card`,m.__docgenInfo={description:`Ref forwarding is required, not decorative: MUI Tooltip/Menu, Popper,
IntersectionObserver-driven reveals and scroll-into-view all reach for the
underlying node. A card that swallows its ref silently breaks every one.`,methods:[],displayName:`Card`}})),g=e((()=>{h(),l()})),_=e((()=>{}));function v(e){let t=[];for(let n of T){let r=e[n];r!==void 0&&t.push(`${n}="${r}"`)}for(let n of E)e[n]&&t.push(n);return`<Card${t.length>0?` ${t.join(` `)}`:``}>${e.children}</Card>`}function y(e){let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select(),document.execCommand(`copy`),document.body.removeChild(t)}function b({inverse:e=!1,...t}){let n=v(t),[r,i]=(0,C.useState)(!1),a=(0,C.useRef)(void 0);(0,C.useEffect)(()=>()=>clearTimeout(a.current),[]);let o=async()=>{try{await navigator.clipboard.writeText(n)}catch{y(n)}i(!0),clearTimeout(a.current),a.current=setTimeout(()=>i(!1),1200)},{children:s,body:c,href:l,...u}=t;return(0,w.jsxs)(`article`,{className:`ic-specimen`,"data-inverse":e||void 0,children:[(0,w.jsx)(`div`,{className:`ic-specimen__stage`,children:l===void 0?(0,w.jsxs)(m,{...u,children:[s,c]}):(0,w.jsxs)(m,{href:l,...u,children:[s,c]})}),(0,w.jsxs)(`button`,{type:`button`,onClick:o,className:`ic-specimen__code`,"data-copied":r||void 0,"aria-label":`Copy code: ${n}`,children:[(0,w.jsxs)(`span`,{className:`ic-specimen__code-meta`,"aria-hidden":`true`,children:[(0,w.jsx)(`span`,{children:`JSX`}),(0,w.jsx)(`span`,{className:`ic-specimen__copy-state`,children:r?(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(S,{}),`Copied`]}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(x,{}),`Copy`]})})]}),(0,w.jsx)(`code`,{children:n}),(0,w.jsx)(`span`,{className:`ic-visually-hidden`,"aria-live":`polite`,children:r?`Code copied to clipboard`:``})]})]})}function x(){return(0,w.jsxs)(`svg`,{viewBox:`0 0 16 16`,"aria-hidden":`true`,children:[(0,w.jsx)(`rect`,{x:`5.25`,y:`5.25`,width:`7.5`,height:`7.5`,rx:`1.5`}),(0,w.jsx)(`path`,{d:`M10.75 5.25V4A1.75 1.75 0 0 0 9 2.25H4A1.75 1.75 0 0 0 2.25 4v5A1.75 1.75 0 0 0 4 10.75h1.25`})]})}function S(){return(0,w.jsx)(`svg`,{viewBox:`0 0 16 16`,"aria-hidden":`true`,children:(0,w.jsx)(`path`,{d:`m3 8.25 3.1 3.1L13 4.65`})})}var C,w,T,E,D=e((()=>{C=t(n(),1),h(),_(),w=r(),T=[`variant`,`tone`,`fill`,`pad`,`accent`,`href`],E=[`interactive`,`noBorder`,`fullHeight`,`disabled`],b.__docgenInfo={description:`One card plus the exact JSX that produced it. Click the code to copy it.`,methods:[],displayName:`Swatch`,props:{variant:{required:!1,tsType:{name:`unknown`},description:``},tone:{required:!1,tsType:{name:`union`,raw:`| "primary"\r
| "secondary"\r
| "accent"\r
| "success"\r
| "warning"\r
| "danger"\r
| "info"\r
| "accent-green"\r
| "accent-pink"\r
| "neutral"`,elements:[{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"accent"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`},{name:`literal`,value:`"danger"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"accent-green"`},{name:`literal`,value:`"accent-pink"`},{name:`literal`,value:`"neutral"`}]},description:``},fill:{required:!1,tsType:{name:`union`,raw:`"glass" | "surface" | "elevated" | "gradient" | "outline"`,elements:[{name:`literal`,value:`"glass"`},{name:`literal`,value:`"surface"`},{name:`literal`,value:`"elevated"`},{name:`literal`,value:`"gradient"`},{name:`literal`,value:`"outline"`}]},description:``},pad:{required:!1,tsType:{name:`union`,raw:`"none" | "sm" | "md" | "lg"`,elements:[{name:`literal`,value:`"none"`},{name:`literal`,value:`"sm"`},{name:`literal`,value:`"md"`},{name:`literal`,value:`"lg"`}]},description:``},accent:{required:!1,tsType:{name:`string`},description:``},href:{required:!1,tsType:{name:`string`},description:``},interactive:{required:!1,tsType:{name:`boolean`},description:``},noBorder:{required:!1,tsType:{name:`boolean`},description:``},fullHeight:{required:!1,tsType:{name:`boolean`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``},children:{required:!0,tsType:{name:`string`},description:`Restricted to a string so the printed snippet is always the literal JSX.`},body:{required:!1,tsType:{name:`ReactNode`},description:`Story-only scaffolding rendered inside the card. Never printed.`},inverse:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}}}}})),O=e((()=>{}));function k({title:e,description:t,children:n}){return(0,j.jsxs)(`section`,{className:`ic-story-section`,children:[(0,j.jsx)(`div`,{className:`ic-story-section__header`,children:(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`h3`,{className:`ic-story-section__title`,children:e}),t?(0,j.jsx)(`p`,{className:`ic-story-section__description`,children:t}):null]})}),n]})}function A({title:e,description:t,children:n}){return(0,j.jsxs)(`main`,{className:`ic-story`,children:[(0,j.jsxs)(`header`,{className:`ic-story__hero`,children:[(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`p`,{className:`ic-story__eyebrow`,children:`IC / component specimen`}),(0,j.jsx)(`h2`,{className:`ic-story__title`,children:e}),(0,j.jsx)(`p`,{className:`ic-story__lede`,children:t})]}),(0,j.jsxs)(`div`,{className:`ic-story__axes`,"aria-label":`Card design axes`,children:[(0,j.jsx)(`span`,{children:`tone`}),(0,j.jsx)(`span`,{children:`fill`}),(0,j.jsx)(`span`,{children:`pad`})]})]}),(0,j.jsx)(`div`,{className:`ic-story__body`,children:n})]})}var j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y;e((()=>{g(),D(),O(),j=r(),M=[`primary`,`secondary`,`accent`,`success`,`warning`,`danger`,`info`,`accent-green`,`accent-pink`,`neutral`],N=[`glass`,`surface`,`elevated`,`gradient`,`outline`],P=[`none`,`sm`,`md`,`lg`],F=Object.keys(o),I=[{id:`think`,label:`Think`},{id:`elemetrik`,label:`Elemetrik`}],L=M.filter(e=>e!==`neutral`),R=[`gradient`,`outline`],z={title:`Components/Card`,component:m,tags:[`autodocs`],parameters:{docs:{description:{component:"A token-driven container with independent tone, fill, and pad axes. Pass `href` to render an anchor, `onClick` to get button semantics; explicit axis props override named presets.\n\nEvery card below prints its own JSX underneath it — click the code to copy it. The story-level **Show code** panel shows the surrounding loop, so the per-card snippet is the one to copy."}}},args:{children:`Quarterly revenue`,pad:`md`,noBorder:!1,fullHeight:!1,disabled:!1},argTypes:{tone:{control:`select`,options:M,description:`Colour identity.`},fill:{control:`select`,options:N,description:`How the tone is applied to the surface.`},pad:{control:`inline-radio`,options:P,description:`Inner padding scale.`},variant:{control:`select`,options:[void 0,...F],description:`Named preset. Explicit axis props take precedence.`},accent:{control:`text`,description:`Top accent strip. Any CSS colour string.`},href:{control:`text`,description:`When set, renders an anchor instead of a div.`},interactive:{control:`boolean`,description:`Hover/focus lift. Defaults to on for a clickable card.`},as:{control:!1},children:{control:`text`}}},B={render:({children:e,variant:t,tone:n,fill:r,pad:i,accent:a,href:o,interactive:s,noBorder:c,fullHeight:l,disabled:u})=>(0,j.jsx)(A,{title:`Card workbench`,description:`Tune the axes in Controls. The specimen and its paste-ready JSX update together.`,children:(0,j.jsx)(k,{title:`Live specimen`,description:`Click the dark code panel to copy this exact setup.`,children:(0,j.jsx)(`div`,{className:`ic-story-grid`,children:(0,j.jsx)(b,{variant:t,tone:n,fill:r,pad:i,accent:a,href:o,interactive:s,noBorder:c,fullHeight:l,disabled:u,children:typeof e==`string`?e:`Quarterly revenue`})})})})},V={render:()=>(0,j.jsx)(A,{title:`Preset index`,description:`Four structural presets — glass/surface/elevated/outline — plus exactly one per token role. Convenience aliases only, never a separate styling API: each resolves to a point in tone × fill space and nothing else.`,children:(0,j.jsx)(k,{title:`Named presets`,description:`Each resolves to the same orthogonal axes shown in Controls.`,children:(0,j.jsx)(`div`,{className:`ic-story-grid`,children:F.map(e=>(0,j.jsx)(b,{variant:e,children:e},e))})})})},H={render:()=>(0,j.jsx)(A,{title:`Tone × fill atlas`,description:`Every surface treatment against every colour identity. The axes are orthogonal, so all 50 cells are reachable — a named preset is just one of them.`,children:N.map(e=>(0,j.jsx)(k,{title:e,description:e===`gradient`?"neutral publishes no gradient, so that one cell degrades to `surface` rather than rendering an invisible box.":void 0,children:(0,j.jsx)(`div`,{className:`ic-story-grid`,children:M.map(t=>(0,j.jsx)(b,{tone:t,fill:e,children:t},t))})},e))})},U={render:()=>(0,j.jsx)(A,{title:`Padding scale`,description:"Inner rhythm, independent of colour. `none` exists for media cards, where an image has to bleed to the corners.",children:(0,j.jsx)(k,{title:`pad`,children:(0,j.jsx)(`div`,{className:`ic-story-grid`,children:P.map(e=>(0,j.jsx)(b,{pad:e,fill:`surface`,children:e},e))})})})},W={render:()=>(0,j.jsxs)(A,{title:`Behaviour states`,description:`Lift, accent, links and the dead state as real interactive elements — not static approximations. Tab through them: focus gets the same treatment as hover.`,children:[(0,j.jsx)(k,{title:`Interaction`,description:`A static card never lifts; a clickable one opts in automatically.`,children:(0,j.jsxs)(`div`,{className:`ic-story-grid`,children:[(0,j.jsx)(b,{fill:`surface`,children:`Static`}),(0,j.jsx)(b,{fill:`surface`,interactive:!0,children:`Lifts on hover`}),(0,j.jsx)(b,{href:`#card-link`,fill:`surface`,children:`Anchor card`}),(0,j.jsx)(b,{href:`#dead-link`,fill:`surface`,disabled:!0,children:`Disabled anchor`})]})}),(0,j.jsx)(k,{title:`Accent strip`,description:"Drawn as a pseudo-element so a hover border-color change cannot wipe it. `accent` takes any CSS colour string — point it at a role token to follow the Brand toolbar, or pass a literal when the colour is the point.",children:(0,j.jsxs)(`div`,{className:`ic-story-grid`,children:[(0,j.jsx)(b,{fill:`glass`,accent:`var(--primary)`,interactive:!0,children:`Primary accent`}),(0,j.jsx)(b,{fill:`glass`,accent:`var(--accent)`,interactive:!0,children:`Accent role`}),(0,j.jsx)(b,{fill:`surface`,accent:`#f43f5e`,noBorder:!0,children:`Any CSS colour`})]})})]})},G={parameters:{docs:{description:{story:"Two composite tokens the theme package publishes alongside the nine single-role gradients — a role blended with `primary` rather than with itself. `accent` takes any CSS colour string, so pointing it at one of these draws the strip as the gradient instead of a flat fill."}}},render:()=>(0,j.jsx)(A,{title:`Cross-family gradients`,description:`--gradient-primary-info and --gradient-primary-accent-pink — not tones, so not in the atlas above.`,children:(0,j.jsx)(k,{title:`primary → info / primary → accent-pink`,description:`Drawn as the accent strip via accent="var(--gradient-primary-info)".`,children:(0,j.jsxs)(`div`,{className:`ic-story-grid`,children:[(0,j.jsx)(b,{fill:`glass`,accent:`var(--gradient-primary-info)`,interactive:!0,children:`primary → info`}),(0,j.jsx)(b,{fill:`glass`,accent:`var(--gradient-primary-accent-pink)`,interactive:!0,children:`primary → accent-pink`})]})})})},K={render:()=>(0,j.jsx)(A,{title:`Context surfaces`,description:`Glass is the one fill whose whole point is what shows through it — so it is shown over an expressive surface rather than a flat page.`,children:(0,j.jsx)(`div`,{className:`ic-story-context`,children:(0,j.jsx)(k,{title:`Glass over a gradient`,description:`A flat canvas hides what glass does. This panel stays dark in either Scheme — a per-subtree scheme is a case the card has to survive, not just a screenshot.`,children:(0,j.jsxs)(`div`,{className:`ic-story-grid`,children:[(0,j.jsx)(b,{fill:`glass`,inverse:!0,interactive:!0,children:`Glass`}),(0,j.jsx)(b,{fill:`outline`,tone:`accent`,inverse:!0,interactive:!0,children:`Outline`}),(0,j.jsx)(b,{fill:`gradient`,tone:`primary`,inverse:!0,interactive:!0,children:`Gradient`})]})})})})},q={render:()=>(0,j.jsx)(A,{title:`Composition`,description:`A KPI card and a feature card are Card plus content. Neither needs a new variant.`,children:(0,j.jsx)(k,{title:`Built from the primitive`,children:(0,j.jsxs)(`div`,{className:`ic-story-grid`,children:[(0,j.jsxs)(m,{fill:`glass`,accent:`var(--primary)`,interactive:!0,children:[(0,j.jsx)(`p`,{className:`ic-demo-eyebrow`,children:`Monthly recurring`}),(0,j.jsx)(`p`,{className:`ic-demo-value`,children:`$48.2k`}),(0,j.jsx)(`p`,{className:`ic-demo-sub`,children:`vs $41.9k last month`})]}),(0,j.jsxs)(m,{fill:`gradient`,tone:`primary`,children:[(0,j.jsx)(`p`,{className:`ic-demo-eyebrow`,children:`Featured`}),(0,j.jsx)(`p`,{className:`ic-demo-title`,children:`Automated reconciliation`}),(0,j.jsx)(`p`,{className:`ic-demo-body`,children:`Matches ledger entries against settlement files, then flags only what disagrees.`})]}),(0,j.jsxs)(m,{as:`article`,fill:`outline`,tone:`accent`,interactive:!0,children:[(0,j.jsx)(`p`,{className:`ic-demo-eyebrow`,children:`Semantic`}),(0,j.jsx)(`p`,{className:`ic-demo-title`,children:`as="article"`}),(0,j.jsx)(`p`,{className:`ic-demo-body`,children:`The wrapper element is a prop, so a card in a feed can be an article and a card in a list can be an li.`})]})]})})})},J={parameters:{docs:{description:{story:`Both brand presets at once, at whichever scheme the toolbar is set to. The Brand toggle switches the rest of the workshop; this story is the one place you can see the delta without flipping back and forth.`}}},render:(e,{globals:t})=>{let n=t.scheme===`dark`?`dark`:`light`;return(0,j.jsx)(A,{title:`Brand comparison`,description:`The same cards under both starterkit-theme presets, side by side at the current scheme.`,children:(0,j.jsx)(k,{title:`Think vs Elemetrik — ${n} scheme`,description:`Watch the gradient row: its label ink is dark under Think and white under Elemetrik, because --<role>-on-solid is measured per brand rather than assumed.`,children:(0,j.jsx)(`div`,{className:`ic-story-brands`,children:I.map(({id:e,label:t})=>(0,j.jsxs)(`div`,{className:`ic-story-brand`,"data-brand":e,"data-mui-color-scheme":n,"data-theme":n,children:[(0,j.jsxs)(`p`,{className:`ic-story-brand__label`,children:[(0,j.jsx)(`span`,{className:`ic-story-brand__dot`}),t]}),R.map(e=>(0,j.jsxs)(`div`,{className:`ic-story-brand__row`,children:[(0,j.jsx)(`span`,{className:`ic-story-brand__fill`,children:e}),(0,j.jsx)(`div`,{className:`ic-story-grid`,children:L.map(t=>(0,j.jsx)(m,{tone:t,fill:e,pad:`sm`,children:t},t))})]},e))]},e))})})})}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: ({
    children,
    variant,
    tone,
    fill,
    pad,
    accent,
    href,
    interactive,
    noBorder,
    fullHeight,
    disabled
  }) => <StoryFrame title="Card workbench" description="Tune the axes in Controls. The specimen and its paste-ready JSX update together.">\r
      <Section title="Live specimen" description="Click the dark code panel to copy this exact setup.">\r
        <div className="ic-story-grid">\r
          <Swatch variant={variant} tone={tone} fill={fill} pad={pad} accent={accent} href={href} interactive={interactive} noBorder={noBorder} fullHeight={fullHeight} disabled={disabled}>\r
            {typeof children === "string" ? children : "Quarterly revenue"}\r
          </Swatch>\r
        </div>\r
      </Section>\r
    </StoryFrame>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <StoryFrame title="Preset index" description="Four structural presets — glass/surface/elevated/outline — plus exactly one per token role. Convenience aliases only, never a separate styling API: each resolves to a point in tone × fill space and nothing else.">\r
      <Section title="Named presets" description="Each resolves to the same orthogonal axes shown in Controls.">\r
        <div className="ic-story-grid">\r
          {presets.map(variant => <Swatch key={variant} variant={variant}>\r
              {variant}\r
            </Swatch>)}\r
        </div>\r
      </Section>\r
    </StoryFrame>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <StoryFrame title="Tone × fill atlas" description="Every surface treatment against every colour identity. The axes are orthogonal, so all 50 cells are reachable — a named preset is just one of them.">\r
      {fills.map(fill => <Section key={fill} title={fill} description={fill === "gradient" ? "neutral publishes no gradient, so that one cell degrades to \`surface\` rather than rendering an invisible box." : undefined}>\r
          <div className="ic-story-grid">\r
            {tones.map(tone => <Swatch key={tone} tone={tone} fill={fill}>\r
                {tone}\r
              </Swatch>)}\r
          </div>\r
        </Section>)}\r
    </StoryFrame>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <StoryFrame title="Padding scale" description="Inner rhythm, independent of colour. \`none\` exists for media cards, where an image has to bleed to the corners.">\r
      <Section title="pad">\r
        <div className="ic-story-grid">\r
          {pads.map(pad => <Swatch key={pad} pad={pad} fill="surface">\r
              {pad}\r
            </Swatch>)}\r
        </div>\r
      </Section>\r
    </StoryFrame>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <StoryFrame title="Behaviour states" description="Lift, accent, links and the dead state as real interactive elements — not static approximations. Tab through them: focus gets the same treatment as hover.">\r
      <Section title="Interaction" description="A static card never lifts; a clickable one opts in automatically.">\r
        <div className="ic-story-grid">\r
          <Swatch fill="surface">Static</Swatch>\r
          <Swatch fill="surface" interactive>\r
            Lifts on hover\r
          </Swatch>\r
          <Swatch href="#card-link" fill="surface">\r
            Anchor card\r
          </Swatch>\r
          <Swatch href="#dead-link" fill="surface" disabled>\r
            Disabled anchor\r
          </Swatch>\r
        </div>\r
      </Section>\r
      <Section title="Accent strip" description="Drawn as a pseudo-element so a hover border-color change cannot wipe it. \`accent\` takes any CSS colour string — point it at a role token to follow the Brand toolbar, or pass a literal when the colour is the point.">\r
        <div className="ic-story-grid">\r
          <Swatch fill="glass" accent="var(--primary)" interactive>\r
            Primary accent\r
          </Swatch>\r
          <Swatch fill="glass" accent="var(--accent)" interactive>\r
            Accent role\r
          </Swatch>\r
          <Swatch fill="surface" accent="#f43f5e" noBorder>\r
            Any CSS colour\r
          </Swatch>\r
        </div>\r
      </Section>\r
    </StoryFrame>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Two composite tokens the theme package publishes alongside the nine single-role " + "gradients — a role blended with \`primary\` rather than with itself. \`accent\` takes " + "any CSS colour string, so pointing it at one of these draws the strip as the gradient " + "instead of a flat fill."
      }
    }
  },
  render: () => <StoryFrame title="Cross-family gradients" description="--gradient-primary-info and --gradient-primary-accent-pink — not tones, so not in the atlas above.">\r
      <Section title="primary → info / primary → accent-pink" description={'Drawn as the accent strip via accent="var(--gradient-primary-info)".'}>\r
        <div className="ic-story-grid">\r
          <Swatch fill="glass" accent="var(--gradient-primary-info)" interactive>\r
            primary → info\r
          </Swatch>\r
          <Swatch fill="glass" accent="var(--gradient-primary-accent-pink)" interactive>\r
            primary → accent-pink\r
          </Swatch>\r
        </div>\r
      </Section>\r
    </StoryFrame>
}`,...G.parameters?.docs?.source},description:{story:"The 1.1.1 ABI publishes composite gradients alongside the nine single-role\r\nones — a role blended with `primary` rather than with itself. There are\r\nonly two: `--gradient-primary-info` and `--gradient-primary-accent-pink`.\r\nNeither is a card tone (`data-tone` only ever selects a single role), so\r\nthey are shown the same way any raw host token reaches the card: through\r\n`accent`, which takes any CSS colour string and is drawn as the top strip.",...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <StoryFrame title="Context surfaces" description="Glass is the one fill whose whole point is what shows through it — so it is shown over an expressive surface rather than a flat page.">\r
      <div className="ic-story-context">\r
        <Section title="Glass over a gradient" description="A flat canvas hides what glass does. This panel stays dark in either Scheme — a per-subtree scheme is a case the card has to survive, not just a screenshot.">\r
          <div className="ic-story-grid">\r
            <Swatch fill="glass" inverse interactive>\r
              Glass\r
            </Swatch>\r
            <Swatch fill="outline" tone="accent" inverse interactive>\r
              Outline\r
            </Swatch>\r
            <Swatch fill="gradient" tone="primary" inverse interactive>\r
              Gradient\r
            </Swatch>\r
          </div>\r
        </Section>\r
      </div>\r
    </StoryFrame>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <StoryFrame title="Composition" description="A KPI card and a feature card are Card plus content. Neither needs a new variant.">\r
      <Section title="Built from the primitive">\r
        <div className="ic-story-grid">\r
          <Card fill="glass" accent="var(--primary)" interactive>\r
            <p className="ic-demo-eyebrow">Monthly recurring</p>\r
            <p className="ic-demo-value">$48.2k</p>\r
            <p className="ic-demo-sub">vs $41.9k last month</p>\r
          </Card>\r
          <Card fill="gradient" tone="primary">\r
            <p className="ic-demo-eyebrow">Featured</p>\r
            <p className="ic-demo-title">Automated reconciliation</p>\r
            <p className="ic-demo-body">\r
              Matches ledger entries against settlement files, then flags only what disagrees.\r
            </p>\r
          </Card>\r
          <Card as="article" fill="outline" tone="accent" interactive>\r
            <p className="ic-demo-eyebrow">Semantic</p>\r
            <p className="ic-demo-title">as=&quot;article&quot;</p>\r
            <p className="ic-demo-body">\r
              The wrapper element is a prop, so a card in a feed can be an article and a card in a\r
              list can be an li.\r
            </p>\r
          </Card>\r
        </div>\r
      </Section>\r
    </StoryFrame>
}`,...q.parameters?.docs?.source},description:{story:`The KPI and feature cards in the starterkit are compositions, not variants —\r
they are this component plus content. Kept here as a worked example rather\r
than shipped as API: their typography and trend pills are product decisions,\r
and baking them in would put the library back in the business of guessing.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Both brand presets at once, at whichever scheme the toolbar is set to. " + "The Brand toggle switches the rest of the workshop; this story is the one " + "place you can see the delta without flipping back and forth."
      }
    }
  },
  /* Plain <Card> rather than <Swatch> here, deliberately: a Swatch prints the\r
     JSX that produced it, and the JSX for these specimens is identical across\r
     both columns — the whole difference lives in the wrapper's data-brand. A\r
     copyable snippet that omits the only thing being demonstrated would be\r
     worse than no snippet. Every other story keeps its Swatches. */
  render: (_args, {
    globals
  }) => {
    const scheme = globals.scheme === "dark" ? "dark" : "light";
    return <StoryFrame title="Brand comparison" description="The same cards under both starterkit-theme presets, side by side at the current scheme.">\r
        <Section title={\`Think vs Elemetrik — \${scheme} scheme\`} description="Watch the gradient row: its label ink is dark under Think and white under Elemetrik, because --<role>-on-solid is measured per brand rather than assumed.">\r
          <div className="ic-story-brands">\r
            {brands.map(({
            id,
            label
          }) => (
          /* Both attributes on THIS element, not split with an ancestor:\r
             brands.generated.css scopes each preset's light block as\r
             [data-brand="x"][data-mui-color-scheme="light"], a compound\r
             selector. A wrapper carrying only data-brand would inherit\r
             <html>'s light scheme yet match the brand's dark block, and\r
             the column would quietly render dark tokens on a light page. */
          <div key={id} className="ic-story-brand" data-brand={id} data-mui-color-scheme={scheme} data-theme={scheme}>\r
                <p className="ic-story-brand__label">\r
                  <span className="ic-story-brand__dot" />\r
                  {label}\r
                </p>\r
                {comparisonFills.map(fill => <div key={fill} className="ic-story-brand__row">\r
                    <span className="ic-story-brand__fill">{fill}</span>\r
                    <div className="ic-story-grid">\r
                      {comparisonTones.map(tone => <Card key={tone} tone={tone} fill={fill} pad="sm">\r
                          {tone}\r
                        </Card>)}\r
                    </div>\r
                  </div>)}\r
              </div>))}\r
          </div>\r
        </Section>\r
      </StoryFrame>;
  }
}`,...J.parameters?.docs?.source}}},Y=[`Playground`,`Presets`,`AxisMatrix`,`Padding`,`States`,`CrossFamilyGradients`,`OnAColouredSurface`,`Composition`,`BrandComparison`]}))();export{H as AxisMatrix,J as BrandComparison,q as Composition,G as CrossFamilyGradients,K as OnAColouredSurface,U as Padding,B as Playground,V as Presets,W as States,Y as __namedExportsOrder,z as default};