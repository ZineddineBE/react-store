function generateUrls(n = 100, size = 500) {
  const promises = Array.from({ length: n }, (_, i) =>
    fetch(`https://picsum.photos/seed/${i}/${size}`).then(
      (response) => response.url,
    ),
  );
  return Promise.all(promises).then((urls) => {
    const urlsString = urls.join("\n");
    console.log(urlsString);
    return urlsString;
  });
}

generateUrls(144, 500);
