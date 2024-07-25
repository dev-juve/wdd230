document.addEventListener("DOMContentLoaded", () => {
    const directoryContainer = document.getElementById('directory');
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');

    fetch('./data/members.json')
        .then(response => response.json())
        .then(data => displayMembers(data, 'grid'));

    gridViewButton.addEventListener('click', () => {
        fetch('./data/members.json')
            .then(response => response.json())
            .then(data => displayMembers(data, 'grid'));
    });

    listViewButton.addEventListener('click', () => {
        fetch('./data/members.json')
            .then(response => response.json())
            .then(data => displayMembers(data, 'list'));
    });

    function displayMembers(members, view) {
        directoryContainer.innerHTML = '';
        if (view === 'grid') {
            directoryContainer.className = 'grid';
            members.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.className = 'member-card';
                memberCard.innerHTML = `
                    <img src="${member.image}" alt="${member.name} loading="lazy" width="auto" height="80">
                    <h2>${member.name}</h2>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                    <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
                    <p>${member.description}</p>
                `;
                directoryContainer.appendChild(memberCard);
            });
        } else if (view === 'list') {
            directoryContainer.className = 'list';
            members.forEach(member => {
                const memberItem = document.createElement('div');
                memberItem.className = 'member-item';
                memberItem.innerHTML = `
                    <img src="${member.image}" loading="lazy" width="auto" height="80" alt="${member.name}">
                    <div>
                        <h2>${member.name}</h2>
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                        <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
                        <p>${member.description}</p>
                    </div>
                `;
                directoryContainer.appendChild(memberItem);
            });
        }
    }
});
