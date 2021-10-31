import React from 'react';

const Text = ({ text }) => {
  const textR = text.split('\n');
  const rndm = () => {
    Math.random().toString();
  };
  const urlReg =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
  return (
    <>
      {textR.map((arr) => {
        if (arr.match(urlReg)) {
          const ptext = arr.replace(urlReg, (x) => `&;l${x}&;l`);
          const stext = ptext.split('&;l');
          return (
            <span key={rndm()}>
              {stext.map((texte) => {
                if (texte.match(urlReg)) {
                  return (
                    <a key={rndm()} href={texte} target="_blank" rel="noreferrer">
                      {texte}
                    </a>
                  );
                }
                return <span key={rndm()}>{texte}</span>;
              })}
              <br />
            </span>
          );
        }
        return (
          <p key={rndm()}>
            {arr} <br />
          </p>
        );
      })}
    </>
  );
};
export default Text;
