import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Member {
  name: string;
  email: string;
  phone: string;
  image: string;
  bgColor: string;
}

interface MembersSectionProps {
  setSelectedMember: React.Dispatch<React.SetStateAction<Member | null>>;
}

const members: Member[] = [
  { name: 'Dispatcher', email: 'dispatcher@example.com', phone: '123-456-7890', image: './images/dispatch.jpeg', bgColor: 'bg-red-500' },
  { name: 'Purchasing Department', email: 'purchasing@example.com', phone: '123-456-7891', image: './images/purchasing.png', bgColor: 'bg-green-500' },
  { name: 'Area Manager', email: 'areamanager@example.com', phone: '123-456-7892', image: './images/area.jpg', bgColor: 'bg-blue-500' },
  { name: 'Team Supervisor', email: 'teamsupervisor@example.com', phone: '123-456-7893', image: 'https://via.placeholder.com/150?text=Team+Supervisor', bgColor: 'bg-yellow-500' },
  { name: 'Vendor Relations', email: 'vendorrelations@example.com', phone: '123-456-7894', image: 'https://via.placeholder.com/150?text=Vendor+Relations', bgColor: 'bg-purple-500' },
  { name: 'Team Chat', email: 'teams@example.com', phone: '123-456-7894', image: 'https://via.placeholder.com/150?text=Team+Chat', bgColor: 'bg-pink-500' },
  { name: 'Human Resources', email: 'hr@example.com', phone: '123-456-7894', image: 'https://via.placeholder.com/150?text=Human+Resources', bgColor: 'bg-teal-500' },
  { name: 'IT Support', email: 'itsupport@example.com', phone: '123-456-7895', image: 'https://via.placeholder.com/150?text=IT+Support', bgColor: 'bg-orange-500' },
  { name: 'Operations Manager', email: 'operations@example.com', phone: '123-456-7896', image: 'https://via.placeholder.com/150?text=Operations+Manager', bgColor: 'bg-indigo-500' },
];

const MembersSection: React.FC<MembersSectionProps> = ({ setSelectedMember }) => {
  return (
    <section className="bg-gray-800 p-4 md:p-6 rounded mb-4" data-aos="zoom-in">
      <h2 className="text-xl md:text-2xl mb-4 text-white"><FontAwesomeIcon icon={faUsers} className="mr-2" />Members</h2>
      <div className="flex flex-wrap gap-2 md:gap-4">
        {members.map((member) => (
          <button key={member.name} className={`${member.bgColor} p-2 md:p-4 rounded text-left`} onClick={() => setSelectedMember(member)}>
            <span className="text-white">{member.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default MembersSection;
