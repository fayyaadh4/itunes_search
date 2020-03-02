getProjectsList = () => {
    fetch('/api/batman')
    .then(res => res.json())
    .then(
      items => {
        console.log("items", items.items.results);
        this.setState({ items: items.items.results }, () =>
          console.log("items fetched", items.items.results)
        );
      },
      error => {
        this.setState({
          error
        });
      }
    );
}

//