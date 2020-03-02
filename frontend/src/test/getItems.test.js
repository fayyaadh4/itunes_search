//created test for mock function to see whether fetch function works
//using async/await to test fetch function 
test('result count should be 50', async () => {
    const term = "batman";
    const api_call = await 
    fetch(`https://itunes.apple.com/search?term=${term}`);
      const data = await api_call.json();
    expect(data.resultCount).toBe(50);
});

//test for error also
test('the fetch fails with an error', async () => {
  try {
    const term = "batman";
    await  fetch(
      `https://itunes.apple.com/search?term=${term}`
    );
  } catch (e) {
    expect(e).toMatch('error');
  }
});