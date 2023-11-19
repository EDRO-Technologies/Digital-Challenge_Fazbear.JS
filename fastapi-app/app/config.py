import os


class Config(object):
    def __init__(self):
        self.MONGO_URI = os.getenv("MONGO_URI")
        self.RABBIT_URL = os.getenv("RABBIT_URL")
        self.RABBIT_QUEUE = os.getenv("RABBIT_QUEUE")
        self.PLATFORM_DOMAIN = os.getenv("PLATFORM_DOMAIN")
        self.DEV = os.getenv("DEV")

        for var in vars(self):
            if var == "DEV":
                continue

            if self.__getattribute__(var) is None:
                raise ValueError(f"mail_worker: переменная '{var}' должна быть установлена в окружении")

    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(Config, cls).__new__(cls)
        return cls.instance
