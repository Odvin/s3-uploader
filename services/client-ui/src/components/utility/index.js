const MBSize = 1024 * 1024;

const sizeDescription = sizeInBits => {
  return sizeInBits > MBSize
    ? `${Math.floor(sizeInBits / MBSize)} Mb`
    : `${Math.floor(sizeInBits / 1024)} Kb`;
};

const filesSizeDescription = (minSize, maxSize) => {
  return `${sizeDescription(minSize)}; ${sizeDescription(maxSize)}`;
};

export { sizeDescription, filesSizeDescription };
