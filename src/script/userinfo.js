export class UserInfo {
  constructor(name, about, api) {
    this.name = name;
    this.about = about;
    this.api = api;
    this.id = '';
  }

  setUserInfo(name, about) {
    return this.api.setUserInfo(name, about)
    .then((result) => {
      this.name = result.name;
      this.about = result.about;
      this.updateUserInfo();
    })
    .catch((res) => {
      console.log(res);
    });
  }

  updateUserInfo() {
    document.querySelector('.user-info__name').textContent = this.name;
    document.querySelector('.user-info__job').textContent = this.about;
  }

  getUserInfo() {
    this.api.getUserInfo()
    .then((result) => {
      this.name = result.name;
      this.about = result.about;
      this.id = result._id;
      this.updateUserInfo();
    })
    .catch((err) => {
      console.log(err);
    });
  }
}