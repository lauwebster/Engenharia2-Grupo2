import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  patientInfo: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8f9fa'
  },
  examCard: {
    marginBottom: 15,
    padding: 10,
    borderBottom: 1,
    borderColor: '#dee2e6'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5
  },
  text: {
    fontSize: 12,
    marginBottom: 3
  }
});

const ExamsPDF = ({ exams, patient }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Relatório de Exames</Text>
      
      {patient && (
        <View style={styles.patientInfo}>
          <Text style={styles.title}>Dados do Paciente</Text>
          <Text style={styles.text}>Nome: {patient.nome}</Text>
          <Text style={styles.text}>CPF: {patient.cpf}</Text>
          {patient.data_nascimento && (
            <Text style={styles.text}>
              Data de Nascimento: {new Date(patient.data_nascimento).toLocaleDateString()}
            </Text>
          )}
        </View>
      )}

      {exams.map((exam) => (
        <View key={exam.id} style={styles.examCard}>
          <Text style={styles.title}>{exam.tipo}</Text>
          <Text style={styles.text}>
            Data: {new Date(exam.data_exame).toLocaleDateString()}
          </Text>
          <Text style={styles.text}>
            Resultado: {exam.resultado || "Não informado"}
          </Text>
          {exam.observacoes && (
            <Text style={styles.text}>Observações: {exam.observacoes}</Text>
          )}
        </View>
      ))}
    </Page>
  </Document>
);

export default ExamsPDF; 