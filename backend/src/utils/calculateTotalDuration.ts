export const calculateTotalDuration = (lessons: any): string => {
    let duration = "00H 00M 00S";
    let h = 0;
    let m = 0;
    let s = 0;
    for (let i = 0; i < lessons.length; i++) {
      let currduration: string = lessons[i].duration;
      const hourMatch = currduration.match(/(\d+)H/);
      const minuteMatch = currduration.match(/(\d+)M/);
      const secondMatch = currduration.match(/(\d+)S/);
  if (secondMatch) {
          let cs = `${secondMatch[1]}`;
          if (Number(cs) != 0) {
            s = s + Number(cs);
            if (s >= 60) {
              m = m + Math.floor(s / 60);
              s = s - 60 *Math.floor(s / 60);
            }
          }
        }
        if (minuteMatch) {
        let cm = `${minuteMatch[1]}`;
        if (Number(cm) != 0) {
          m = m + Number(cm);
          if (m >= 60) {
            h = h + Math.floor(m / 60);
            m = m - 60 * Math.floor(m / 60);
          }
        }
      }
      if (hourMatch) {
        let ch = `${hourMatch[1]}`;
        if (Number(ch) != 0) {
          h = h + Number(ch);
        }
      }
    }
    duration = `${h?h+'H':''} ${m?m+'M':''} ${s?s+'S':''}`;
    return duration;
  };