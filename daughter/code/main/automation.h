#define SERVICE_LOOP 100
#define SERVICE_LOOP_SHORT 10

struct ServiceMessage
{
	cJSON *message;
	cJSON *messageQueue[100];
	bool read;
	int timeout;
	int queueCount;
};

struct UartMessage
{
	cJSON *message;
	cJSON *messageQueue[100];
	bool readyToSend;
	int timeout;
	int queueCount;
};

struct ClientMessage
{
	char message[1000];
	char messageQueue[20][1000];
	bool readyToSend;
	int timeout;
	int queueCount;
};

struct ServiceMessage serviceMessage;
struct ClientMessage clientMessage;
struct UartMessage uartMessage;

cJSON *null_payload = NULL;
cJSON *payload = NULL;

cJSON * checkServiceMessage(char *eventType)
{
	if (serviceMessage.read) return null_payload;

	if (serviceMessage.message == NULL) return null_payload;
	if (!cJSON_GetObjectItem(serviceMessage.message,"eventType")) return null_payload;

	char type[50] = "";
	strcpy(type, cJSON_GetObjectItem(serviceMessage.message,"eventType")->valuestring);

	if (strcmp(type, eventType)) return null_payload;
	if (!cJSON_GetObjectItem(serviceMessage.message,"payload")) return null_payload;

	payload = cJSON_GetObjectItem(serviceMessage.message,"payload");

	serviceMessage.read = true;
	return payload;
}

void addUartMessageToQueue (cJSON *message)
{
	uartMessage.queueCount++;
	uartMessage.messageQueue[uartMessage.queueCount] = message;
}

void addServiceMessageToQueue (cJSON *message)
{
	serviceMessage.queueCount++;
	serviceMessage.messageQueue[serviceMessage.queueCount] = message;
	return;
}

static void
serviceMessageTask (void *pvParameter)
{
	int timeout_cnt = 0;

  while (1) {
		if (serviceMessage.read) {

			timeout_cnt = 0;
			if (serviceMessage.queueCount > 0) {
				serviceMessage.message = serviceMessage.messageQueue[serviceMessage.queueCount];
				serviceMessage.read = false;
				serviceMessage.queueCount--;
			}
		}
		else if (timeout_cnt > 100) {
			printf("serviceMessageTask timeout reached.\n");
			cJSON_Delete(serviceMessage.message);
			serviceMessage.read = true;
			serviceMessage.queueCount--;
			timeout_cnt = 0;
		} else {
			timeout_cnt++;
		}

    vTaskDelay(SERVICE_LOOP_SHORT / portTICK_PERIOD_MS);
  }
}

void addClientMessageToQueue (char *message)
{
	clientMessage.queueCount++;
	printf("addClientMessageToQueue (%d) %s\n", clientMessage.queueCount, message);
	strcpy(clientMessage.messageQueue[clientMessage.queueCount], message);
}

static void
clientMessageTask (void *pvParameter)
{
	int cnt = 0;
  while (1) {
		if (!clientMessage.readyToSend) {
			if (clientMessage.queueCount > 0) {
				strcpy(clientMessage.message, clientMessage.messageQueue[clientMessage.queueCount]);
				clientMessage.readyToSend = true;
				clientMessage.queueCount--;
			}
		}

    vTaskDelay(SERVICE_LOOP / portTICK_PERIOD_MS);
  }
}
