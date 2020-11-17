export const durranUserModifier = (_durranUsers) => {
  const durranUsers = [..._durranUsers];
  durranUsers.forEach((durranUser, index) => {
    const _durranUser = {
      ...durranUser,
    };

    _durranUser.entries = userEntryModifier(_durranUser.entries);

    delete _durranUser.signingKeyId;
    delete _durranUser.radiksSignature;
    durranUsers[index] = _durranUser;
  });
  return durranUsers;
};

const userEntryModifier = (_entries) => {
  const entries = [..._entries];
  entries.forEach((entry, index) => {
    const _entry = {
      ...entry,
    };

    _entry.dare = userEntryDareModifier(_entry.dare);

    delete _entry.signingKeyId;
    delete _entry.radiksSignature;
    entries[index] = _entry;
  });
  return entries;
};

const userEntryDareModifier = (_dare) => {
  let dare;
  if (_dare.length !== 0) {
    dare = _dare[0];
    delete dare.signingKeyId;
    delete dare.radiksSignature;
  }
  return dare;
};

// export const durranUserModifier = (_durranUsers) => {
//   const durranUsers = [..._durranUsers];
//   durranUsers.forEach((durranUser, index) => {
//     const _durranUser = {
//       ...durranUser,
//     };

//     // if (_durranUser.hasOwnProperty("entries")) {
//     //   const _entries = _durranUser.entries;
//     //   const entries = [..._entries];

//     //   entries.forEach((entry, index) => {
//     //     const _entry = {
//     //       ...entry,
//     //     };

//     //     delete _entry.signingKeyId;
//     //     delete _entry.radiksSignature;
//     //     entry[index] = _entry;
//     //     _durranUser.entries.ap = entries;
//     //   });

//     // }

//     delete _durranUser.signingKeyId;
//     delete _durranUser.radiksSignature;
//     durranUsers[index] = _durranUser;
//   });
//   return durranUsers;
// };
