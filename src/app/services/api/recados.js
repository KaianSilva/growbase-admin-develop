import api from './apiRecados';

class Recados {
	async getMessages() {
		this.response = await api.get('message');

		return this.response;
	}

	async getMessage(uid) {
		this.response = await api.get(`message/${uid}`);

		return this.response;
	}

	async deleteMessage(uid) {
		console.log(uid.uid);
		this.response = await api.delete(`message/${uid.uid}`);

		/* return this.response; */
		return { success: true, data: this.response.data, message: 'Recado deletado com sucesso.' };
	}

	async putMessage(uid, data) {
		this.response = await api.put(`message/${uid}`, data);
		/* return this.response; */
		return { success: true, data: this.response.data, message: 'Recado atualizado com sucesso.' };
	}

	async postMessage(data) {
		console.log(data);
		this.response = await api.post(`message`, data);
		console.log(this.response);
		return { success: true, data: this.response.data, message: 'Recado criado com sucesso.' };
	}
}

export default new Recados();
/* 
import Api from './apiRecados';

export default Api; */
