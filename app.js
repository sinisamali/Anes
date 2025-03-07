app.get('/videos', async (req, res) => {
  try {
    const videoUsers = await User.find(
      { video_urls: { $exists: true, $not: { $size: 0 } } },
      { video_urls: 1, _id: 1 }
    );
    res.json(videoUsers);
  } catch (err) {
    console.error('Error fetching videos:', err);
    res.status(500).send('Internal Server Error');
  }
});
