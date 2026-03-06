const { SocietyMemberService } = require('../services');

class SocietyMemberController {
    async getAllSocietyMembers(req, res) {
        try {
            // Can pass societyId as query param: /society-members?societyId=123
            const members = await SocietyMemberService.getAllMembers(req.query);
            res.status(200).json(members);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getSocietyMemberById(req, res) {
        try {
            const member = await SocietyMemberService.getMemberById(req.params.id);
            if (!member) return res.status(404).json({ error: 'Society Member not found' });
            res.status(200).json(member);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createSocietyMember(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const member = await SocietyMemberService.createMember(req.body, userId);
            res.status(201).json(member);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateSocietyMember(req, res) {
        try {
            const member = await SocietyMemberService.updateMember(req.params.id, req.body);
            if (!member) return res.status(404).json({ error: 'Society Member not found' });
            res.status(200).json(member);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteSocietyMember(req, res) {
        try {
            const success = await SocietyMemberService.deleteMember(req.params.id);
            if (!success) return res.status(404).json({ error: 'Society Member not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new SocietyMemberController();
