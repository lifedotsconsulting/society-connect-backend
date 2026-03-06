const { SocietyMemberRepository } = require('../repositories');

class SocietyMemberService {
    async getAllMembers(filters = {}) {
        return await SocietyMemberRepository.findAll(filters);
    }

    async getMemberById(id) {
        return await SocietyMemberRepository.findById(id);
    }

    async addMember(memberData, userId) {
        memberData.createdBy = userId;
        return await SocietyMemberRepository.create(memberData);
    }

    async updateMember(id, updateData, userId = null) {
        return await SocietyMemberRepository.update(id, updateData, userId);
    }

    async removeMember(id) {
        return await SocietyMemberRepository.delete(id);
    }
}

module.exports = new SocietyMemberService();
