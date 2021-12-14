const fileValidator = (fileList, accessType, sizeLimit, fileLimit, accessTypeWarning) =>
  new Promise((rs, rj) => {
    const ret = [];
    let size = 0;
    if (fileList && !(fileList.length <= 0)) {
      for (let i = 0; i < fileList.length; i++) {
        const arr = fileList[i];
        if (accessType.includes(arr.type)) {
          ret.push(arr);
          size += arr.size;
        } else if (!arr.type) {
          console.log('invalid file!');
        } else {
          rj(accessTypeWarning);
          break;
        }
      }
      if (ret.length <= fileLimit) {
        if (size > sizeLimit * 1024 * 1024) {
          rj(`Files must be less than ${sizeLimit}MB at total`);
        } else {
          rs(ret);
        }
      } else {
        rj(`Maximum ${fileLimit} files are allowed.`);
      }
    } else {
      rj('Unexpected Error!');
    }
  });

export default fileValidator;
